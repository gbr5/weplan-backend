import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IComercialCardResultsRepository from '../repositories/IComercialCardResultsRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICreateComercialCardResultsDTO from '../dtos/ICreateComercialCardResultsDTO';
import ComercialCardResult from '../infra/typeorm/entities/ComercialCardResult';

@injectable()
class CreateComercialCardResultsService {
  constructor(
    @inject('ComercialCardResultsRepository')
    private comercialCardResultsRepository: IComercialCardResultsRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute({
    card_id,
    note,
    contract_value,
    isSuccessful,
  }: ICreateComercialCardResultsDTO): Promise<ComercialCardResult> {
    const cardExists = await this.stageCardsRepository.findById(card_id);

    if (!cardExists) {
      throw new AppError('Card not found.');
    }
    const comercialCardExists = await this.comercialCardResultsRepository.findByCardId(
      card_id,
    );
    if (comercialCardExists) {
      throw new AppError('Card already have results, try to edit it.');
    }

    cardExists.isActive = false;
    await this.stageCardsRepository.save(cardExists);

    const card = await this.comercialCardResultsRepository.create({
      card_id,
      note,
      contract_value,
      isSuccessful,
    });

    return card;
  }
}

export default CreateComercialCardResultsService;
