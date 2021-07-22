import { injectable, inject } from 'tsyringe';

import EventSupplierTransaction from '@modules/transactions/infra/typeorm/entities/EventSupplierTransaction';
import IEventSupplierTransactionsRepository from '@modules/transactions/repositories/IEventSupplierTransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventSupplierTransactionsService {
  constructor(
    @inject('EventSupplierTransactionsRepository')
    private eventSupplierTransactionsRepository: IEventSupplierTransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    agreement_id: string,
  ): Promise<EventSupplierTransaction[]> {
    const transaction = await this.eventSupplierTransactionsRepository.findByAgreementId(
      agreement_id,
    );

    return transaction;
  }
}

export default ListEventSupplierTransactionsService;
