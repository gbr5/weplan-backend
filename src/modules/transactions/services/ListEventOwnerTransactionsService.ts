import { injectable, inject } from 'tsyringe';

import EventOwnerTransaction from '@modules/transactions/infra/typeorm/entities/EventOwnerTransaction';
import IEventOwnerTransactionsRepository from '@modules/transactions/repositories/IEventOwnerTransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventOwnerTransactionsService {
  constructor(
    @inject('EventOwnerTransactionsRepository')
    private eventOwnerTransactionsRepository: IEventOwnerTransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(agreement_id: string): Promise<EventOwnerTransaction[]> {
    const transaction = await this.eventOwnerTransactionsRepository.findByAgreementId(
      agreement_id,
    );

    return transaction;
  }
}

export default ListEventOwnerTransactionsService;
