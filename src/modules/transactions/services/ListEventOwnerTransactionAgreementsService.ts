import { injectable, inject } from 'tsyringe';

import EventOwnerTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventOwnerTransactionAgreement';
import IEventOwnerTransactionAgreementsRepository from '@modules/transactions/repositories/IEventOwnerTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventOwnerTransactionAgreementsService {
  constructor(
    @inject('EventOwnerTransactionAgreementsRepository')
    private eventOwnerTransactionAgreementsRepository: IEventOwnerTransactionAgreementsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    supplier_id: string,
  ): Promise<EventOwnerTransactionAgreement[]> {
    const transaction = await this.eventOwnerTransactionAgreementsRepository.findByOwnerId(
      supplier_id,
    );

    return transaction;
  }
}

export default ListEventOwnerTransactionAgreementsService;
