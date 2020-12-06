import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardOutsideParticipantsRepository from '../repositories/ICardOutsideParticipantsRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICreateCardOutsideParticipantDTO from '../dtos/ICreateCardOutsideParticipantDTO';
import CardOutsideParticipant from '../infra/typeorm/entities/CardOutsideParticipant';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';

@injectable()
class CreateCardOutsideParticipantService {
  constructor(
    @inject('CardOutsideParticipantsRepository')
    private cardOutsideParticipants: ICardOutsideParticipantsRepository,

    @inject('CompanyContactsRepository')
    private CompanyContactsRepository: ICompanyContactsRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute({
    company_contact_id,
    card_unique_name,
    contact_card_unique_name,
    status,
    isActive,
  }: ICreateCardOutsideParticipantDTO): Promise<CardOutsideParticipant> {
    const cardExists = await this.stageCardsRepository.findByUniqueName(
      card_unique_name,
    );

    if (!cardExists) {
      throw new AppError('Card not found.');
    }

    const outsideParticipantExists = await this.CompanyContactsRepository.findById(
      company_contact_id,
    );

    if (!outsideParticipantExists) {
      throw new AppError('Customer not found.');
    }

    const card = await this.cardOutsideParticipants.create({
      company_contact_id,
      card_unique_name,
      contact_card_unique_name,
      status,
      isActive,
    });

    return card;
  }
}

export default CreateCardOutsideParticipantService;
