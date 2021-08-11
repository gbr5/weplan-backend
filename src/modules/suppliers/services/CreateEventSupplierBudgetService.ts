import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSupplierBudgetsRepository from '@modules/suppliers/repositories/IEventSupplierBudgetsRepository';
import EventSupplierBudget from '@modules/suppliers/infra/typeorm/entities/EventSupplierBudget';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import ICreateEventSupplierBudgetDTO from '../dtos/ICreateEventSupplierBudgetDTO';

@injectable()
class CreateEventSupplierBudgetService {
  constructor(
    @inject('EventSupplierBudgetsRepository')
    private eventSupplierBudgetsRepository: IEventSupplierBudgetsRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSuppliersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    supplier_id,
    amount,
    description,
    due_date,
    isActive,
  }: ICreateEventSupplierBudgetDTO): Promise<EventSupplierBudget> {
    const eventSupplierExists = await this.eventSuppliersRepository.findById(
      supplier_id,
    );

    if (!eventSupplierExists) {
      throw new AppError('EventSupplier not found!');
    }

    const file = await this.eventSupplierBudgetsRepository.create({
      supplier_id,
      amount,
      description,
      due_date,
      isActive,
    });

    return file;
  }
}

export default CreateEventSupplierBudgetService;
