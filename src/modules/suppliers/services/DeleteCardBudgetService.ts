import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardBudgetsRepository from '@modules/suppliers/repositories/ICardBudgetsRepository';

@injectable()
class DeleteCardBudgetService {
  constructor(
    @inject('CardBudgetsRepository')
    private cardBudgetsRepository: ICardBudgetsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cardBudget = await this.cardBudgetsRepository.findById(id);

    if (!cardBudget) {
      throw new AppError('Event card relation not found.');
    }

    await this.cardBudgetsRepository.delete(cardBudget);
  }
}

export default DeleteCardBudgetService;
