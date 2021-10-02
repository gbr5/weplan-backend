import { injectable, inject } from 'tsyringe';

import EventMemberTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventMemberTransactionAgreement';
import IEventMemberTransactionAgreementsRepository from '@modules/transactions/repositories/IEventMemberTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventMemberTransactionAgreementsService {
  constructor(
    @inject('EventMemberTransactionAgreementsRepository')
    private eventMemberTransactionAgreementsRepository: IEventMemberTransactionAgreementsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    supplier_id: string,
  ): Promise<EventMemberTransactionAgreement[]> {
    const transaction = await this.eventMemberTransactionAgreementsRepository.findByMemberId(
      supplier_id,
    );

    return transaction;
  }
}

export default ListEventMemberTransactionAgreementsService;
