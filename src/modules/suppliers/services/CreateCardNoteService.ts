import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ICardNotesRepository from '../repositories/ICardNotesRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICreateCardNoteDTO from '../dtos/ICreateCardNoteDTO';
import CardNote from '../infra/typeorm/entities/CardNote';

@injectable()
class CreateCardNoteService {
  constructor(
    @inject('CardNotesRepository')
    private cardNotesRepository: ICardNotesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute({
    user_id,
    card_unique_name,
    note,
  }: ICreateCardNoteDTO): Promise<CardNote> {
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

    const card = await this.cardNotesRepository.create({
      user_id,
      card_unique_name,
      note,
    });

    return card;
  }
}

export default CreateCardNoteService;
