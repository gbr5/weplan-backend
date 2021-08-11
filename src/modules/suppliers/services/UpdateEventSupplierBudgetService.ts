import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSupplierBudgetsRepository from '@modules/suppliers/repositories/IEventSupplierBudgetsRepository';

import EventSupplierBudget from '@modules/suppliers/infra/typeorm/entities/EventSupplierBudget';

interface IRequest {
  id: string;
  amount: number;
  description: string;
  isActive: boolean;
  due_date: Date;
}

@injectable()
class UpdateEventSupplierBudgetService {
  constructor(
    @inject('EventSupplierBudgetsRepository')
    private eventSupplierBudgetsRepository: IEventSupplierBudgetsRepository,
  ) {}

  public async execute({
    id,
    amount,
    description,
    isActive,
    due_date,
  }: IRequest): Promise<EventSupplierBudget> {
    const supplierBudgets = await this.eventSupplierBudgetsRepository.findById(
      id,
    );

    if (!supplierBudgets) {
      throw new AppError('SupplierBudgets not found.');
    }
    supplierBudgets.amount = amount;
    supplierBudgets.description = description;
    supplierBudgets.isActive = isActive;
    supplierBudgets.due_date = due_date;

    const updatedSupplierBudgets = await this.eventSupplierBudgetsRepository.save(
      supplierBudgets,
    );

    return updatedSupplierBudgets;
  }
}

export default UpdateEventSupplierBudgetService;
