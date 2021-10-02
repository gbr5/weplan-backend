import { injectable, inject } from 'tsyringe';

import EventMemberTransaction from '@modules/transactions/infra/typeorm/entities/EventMemberTransaction';
import IEventMemberTransactionsRepository from '@modules/transactions/repositories/IEventMemberTransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventMemberTransactionsService {
  constructor(
    @inject('EventMemberTransactionsRepository')
    private eventMemberTransactionsRepository: IEventMemberTransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    agreement_id: string,
  ): Promise<EventMemberTransaction[]> {
    const transaction = await this.eventMemberTransactionsRepository.findByAgreementId(
      agreement_id,
    );

    return transaction;
  }
}

export default ListEventMemberTransactionsService;
