import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardBudgetsRepository from '@modules/suppliers/repositories/ICardBudgetsRepository';

import CardBudget from '@modules/suppliers/infra/typeorm/entities/CardBudget';

interface IRequest {
  id: string;
  description: string;
  value: number;
  validity_date: Date;
  number_of_installments: number;
  isValid: boolean;
}

@injectable()
class UpdateCardBudgetService {
  constructor(
    @inject('CardBudgetsRepository')
    private cardBudgetsRepository: ICardBudgetsRepository,
  ) {}

  public async execute({
    id,
    description,
    value,
    validity_date,
    number_of_installments,
    isValid,
  }: IRequest): Promise<CardBudget> {
    const cardBudget = await this.cardBudgetsRepository.findById(id);

    if (!cardBudget) {
      throw new AppError('CardBudget not found.');
    }

    cardBudget.description = description;
    cardBudget.value = value;
    cardBudget.number_of_installments = number_of_installments;
    cardBudget.validity_date = validity_date;
    cardBudget.isValid = isValid;

    const updatedCardBudget = await this.cardBudgetsRepository.save(cardBudget);

    return updatedCardBudget;
  }
}

export default UpdateCardBudgetService;
