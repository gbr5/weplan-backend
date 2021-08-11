import EventSupplierBudget from '@modules/suppliers/infra/typeorm/entities/EventSupplierBudget';
import ICreateEventSupplierBudgetDTO from '../dtos/ICreateEventSupplierBudgetDTO';

export default interface IEventSupplierBudgetsRepository {
  create(data: ICreateEventSupplierBudgetDTO): Promise<EventSupplierBudget>;
  findByEventSupplierId(supplier_id: string): Promise<EventSupplierBudget[]>;
  findById(id: string): Promise<EventSupplierBudget | undefined>;
  save(data: EventSupplierBudget): Promise<EventSupplierBudget>;
  delete(data: EventSupplierBudget): Promise<void>;
}
