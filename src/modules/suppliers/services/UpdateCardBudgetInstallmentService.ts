import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardBudgetInstallmentsRepository from '@modules/suppliers/repositories/ICardBudgetInstallmentsRepository';

import CardBudgetInstallment from '@modules/suppliers/infra/typeorm/entities/CardBudgetInstallment';

interface IRequest {
  id: string;
  value: number;
  due_date: Date;
}

@injectable()
class UpdateCardBudgetInstallmentService {
  constructor(
    @inject('CardBudgetInstallmentsRepository')
    private cardBudgetInstallmentsRepository: ICardBudgetInstallmentsRepository,
  ) {}

  public async execute({
    id,
    value,
    due_date,
  }: IRequest): Promise<CardBudgetInstallment> {
    const cardBudgetInstallment = await this.cardBudgetInstallmentsRepository.findById(
      id,
    );

    if (!cardBudgetInstallment) {
      throw new AppError('CardBudgetInstallment not found.');
    }

    cardBudgetInstallment.value = value;
    cardBudgetInstallment.due_date = due_date;

    const updatedCardBudgetInstallment = await this.cardBudgetInstallmentsRepository.save(
      cardBudgetInstallment,
    );

    return updatedCardBudgetInstallment;
  }
}

export default UpdateCardBudgetInstallmentService;
