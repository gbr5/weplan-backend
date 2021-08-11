import { injectable, inject } from 'tsyringe';

import EventSupplierBudget from '@modules/suppliers/infra/typeorm/entities/EventSupplierBudget';
import IEventSupplierBudgetsRepository from '@modules/suppliers/repositories/IEventSupplierBudgetsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventSupplierBudgetsService {
  constructor(
    @inject('EventSupplierBudgetsRepository')
    private eventSupplierBudgetsRepository: IEventSupplierBudgetsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(supplier_id: string): Promise<EventSupplierBudget[]> {
    const supplierBudgets = await this.eventSupplierBudgetsRepository.findByEventSupplierId(
      supplier_id,
    );

    return supplierBudgets;
  }
}

export default ListEventSupplierBudgetsService;
