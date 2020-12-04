import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardBudgetInstallmentsRepository from '../repositories/ICardBudgetInstallmentsRepository';
import ICreateCardBudgetInstallmentDTO from '../dtos/ICreateCardBudgetInstallmentDTO';
import CardBudgetInstallment from '../infra/typeorm/entities/CardBudgetInstallment';
import ICardBudgetsRepository from '../repositories/ICardBudgetsRepository';

@injectable()
class CreateCardBudgetInstallmentService {
  constructor(
    @inject('CardBudgetInstallmentsRepository')
    private cardBudgetInstallmentsRepository: ICardBudgetInstallmentsRepository,

    @inject('CardBudgetsRepository')
    private cardBudgetsRepository: ICardBudgetsRepository,
  ) {}

  public async execute({
    card_budget_id,
    value,
    due_date,
  }: ICreateCardBudgetInstallmentDTO): Promise<CardBudgetInstallment> {
    const card_budgetExists = await this.cardBudgetsRepository.findById(
      card_budget_id,
    );

    if (!card_budgetExists) {
      throw new AppError('Customer not found.');
    }

    const installment = await this.cardBudgetInstallmentsRepository.create({
      card_budget_id,
      value,
      due_date,
    });

    return installment;
  }
}

export default CreateCardBudgetInstallmentService;
