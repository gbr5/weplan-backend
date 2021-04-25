import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IComercialCardResultsRepository from '@modules/suppliers/repositories/IComercialCardResultsRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICardNotesRepository from '../repositories/ICardNotesRepository';

@injectable()
class DeleteComercialCardResultService {
  constructor(
    @inject('ComercialCardResultsRepository')
    private comercialCardResultsRepository: IComercialCardResultsRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,

    @inject('CardNotesRepository')
    private cardNotesRepository: ICardNotesRepository,
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

    await this.cardNotesRepository.create({
      card_unique_name: card.unique_name,
      note: `Negócio Reaberto|||\n. . . . .\n`,
      user_id: card.card_owner,
    });

    card.isActive = true;

    await this.stageCardsRepository.save(card);
    await this.comercialCardResultsRepository.delete(comercialCardResult);
  }
}

export default DeleteComercialCardResultService;
