import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ICardParticipantsRepository from '../repositories/ICardParticipantsRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICreateCardParticipantDTO from '../dtos/ICreateCardParticipantDTO';
import CardParticipant from '../infra/typeorm/entities/CardParticipant';

@injectable()
class CreateCardParticipantService {
  constructor(
    @inject('CardParticipantsRepository')
    private cardParticipantsRepository: ICardParticipantsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute({
    user_id,
    card_unique_name,
  }: ICreateCardParticipantDTO): Promise<CardParticipant> {
    const cardExists = await this.stageCardsRepository.findByUniqueName(
      card_unique_name,
    );

    if (!cardExists) {
      throw new AppError('Card not found.');
    }

    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User not found.');
    }

    const cardParticipantExists = await this.cardParticipantsRepository.findByUserIdAndCardUniqueName(
      {
        user_id,
        card_unique_name,
      },
    );

    if (cardParticipantExists) {
      throw new AppError(
        'This user is already registered as a participant in this card.',
      );
    }
    const cardParticipant = await this.cardParticipantsRepository.create({
      user_id,
      card_unique_name,
    });

    return cardParticipant;
  }
}

export default CreateCardParticipantService;
