import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IComercialCardResultsRepository from '@modules/suppliers/repositories/IComercialCardResultsRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';

@injectable()
class DeleteComercialCardResultService {
  constructor(
    @inject('ComercialCardResultsRepository')
    private comercialCardResultsRepository: IComercialCardResultsRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const comercialCardResult = await this.comercialCardResultsRepository.findById(
      id,
    );

    if (!comercialCardResult)
      throw new AppError('Event card relation not found.');

    const card = await this.stageCardsRepository.findById(
      comercialCardResult.card_id,
    );

    if (!card) throw new AppError('Card not found');

    card.isActive = true;

    await this.stageCardsRepository.save(card);
    await this.comercialCardResultsRepository.delete(comercialCardResult);
  }
}

export default DeleteComercialCardResultService;
