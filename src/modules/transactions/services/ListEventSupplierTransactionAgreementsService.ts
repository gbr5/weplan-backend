import { injectable, inject } from 'tsyringe';

import EventSupplierTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventSupplierTransactionAgreement';
import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventSupplierTransactionAgreementsService {
  constructor(
    @inject('EventSupplierTransactionAgreementsRepository')
    private eventSupplierTransactionAgreementsRepository: IEventSupplierTransactionAgreementsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    supplier_id: string,
  ): Promise<EventSupplierTransactionAgreement[]> {
    const transaction = await this.eventSupplierTransactionAgreementsRepository.findBySupplierId(
      supplier_id,
    );

    return transaction;
  }
}

export default ListEventSupplierTransactionAgreementsService;
