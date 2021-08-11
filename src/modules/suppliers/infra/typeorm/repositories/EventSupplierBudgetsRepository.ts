import { getRepository, Repository } from 'typeorm';

import IEventSupplierBudgetsRepository from '@modules/suppliers/repositories/IEventSupplierBudgetsRepository';

import EventSupplierBudget from '@modules/suppliers/infra/typeorm/entities/EventSupplierBudget';
import ICreateEventSupplierBudgetDTO from '@modules/suppliers/dtos/ICreateEventSupplierBudgetDTO';

class EventSupplierBudgetsRepository
  implements IEventSupplierBudgetsRepository {
  private ormRepository: Repository<EventSupplierBudget>;

  constructor() {
    this.ormRepository = getRepository(EventSupplierBudget);
  }

  public async findById(id: string): Promise<EventSupplierBudget | undefined> {
    const findEventSupplierBudget = await this.ormRepository.findOne(id);

    return findEventSupplierBudget;
  }

  public async findByEventSupplierId(
    supplier_id: string,
  ): Promise<EventSupplierBudget[]> {
    const findEventSupplierBudgets = await this.ormRepository.find({
      where: { supplier_id },
    });

    return findEventSupplierBudgets;
  }

  public async create(
    data: ICreateEventSupplierBudgetDTO,
  ): Promise<EventSupplierBudget> {
    const supplier = this.ormRepository.create(data);

    await this.ormRepository.save(supplier);

    return supplier;
  }

  public async save(data: EventSupplierBudget): Promise<EventSupplierBudget> {
    return this.ormRepository.save(data);
  }

  public async delete(data: EventSupplierBudget): Promise<void> {
    await this.ormRepository.delete(data.id);
  }
}

export default EventSupplierBudgetsRepository;
