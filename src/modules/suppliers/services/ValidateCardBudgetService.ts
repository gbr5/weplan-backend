import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardBudgetsRepository from '@modules/suppliers/repositories/ICardBudgetsRepository';

import CardBudget from '@modules/suppliers/infra/typeorm/entities/CardBudget';

interface IRequest {
  id: string;
  isValid: boolean;
}

@injectable()
class ValidateCardBudgetService {
  constructor(
    @inject('CardBudgetsRepository')
    private cardBudgetsRepository: ICardBudgetsRepository,
  ) {}

  public async execute({ id, isValid }: IRequest): Promise<CardBudget> {
    const cardBudget = await this.cardBudgetsRepository.findById(id);

    if (!cardBudget) {
      throw new AppError('CardBudget not found.');
    }

    cardBudget.isValid = isValid;

    const updatedCardBudget = await this.cardBudgetsRepository.save(cardBudget);

    return updatedCardBudget;
  }
}

export default ValidateCardBudgetService;
