import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardOutsideParticipantsRepository from '@modules/suppliers/repositories/ICardOutsideParticipantsRepository';

import CardOutsideParticipant from '@modules/suppliers/infra/typeorm/entities/CardOutsideParticipant';
import IStageCardsRepository from '../repositories/IStageCardsRepository';

interface IRequest {
  id: string;
  card_unique_name: string;
  contact_card_unique_name: string;
  status: string;
  isActive: boolean;
}

@injectable()
class UpdateCardOutsideParticipantService {
  constructor(
    @inject('CardOutsideParticipantsRepository')
    private cardOutsideParticipantsRepository: ICardOutsideParticipantsRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute({
    id,
    card_unique_name,
    contact_card_unique_name,
    status,
    isActive,
  }: IRequest): Promise<CardOutsideParticipant> {
    const cardOutsideParticipant = await this.cardOutsideParticipantsRepository.findById(
      id,
    );

    if (!cardOutsideParticipant) {
      throw new AppError('CardOutsideParticipant not found.');
    }

    const cardUniqueName = await this.stageCardsRepository.findByUniqueName(
      card_unique_name,
    );

    if (!cardUniqueName) {
      throw new AppError('CardOutsideParticipant not found.');
    }

    const contactCardUniqueName = await this.stageCardsRepository.findByUniqueName(
      contact_card_unique_name,
    );

    if (!contactCardUniqueName) {
      throw new AppError('CardOutsideParticipant not found.');
    }

    cardOutsideParticipant.card_unique_name = card_unique_name;
    cardOutsideParticipant.contact_card_unique_name = contact_card_unique_name;
    cardOutsideParticipant.status = status;
    cardOutsideParticipant.isActive = isActive;

    const updatedCardOutsideParticipant = await this.cardOutsideParticipantsRepository.save(
      cardOutsideParticipant,
    );

    return updatedCardOutsideParticipant;
  }
}

export default UpdateCardOutsideParticipantService;
