import { injectable, inject } from 'tsyringe';

import IEventMemberTransactionAgreementsRepository from '@modules/transactions/repositories/IEventMemberTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class DeleteEventMemberTransactionAgreementService {
  constructor(
    @inject('EventMemberTransactionAgreementsRepository')
    private eventMemberTransactionAgreementsRepository: IEventMemberTransactionAgreementsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const agreement = await this.eventMemberTransactionAgreementsRepository.findById(
      id,
    );

    if (!agreement)
      throw new AppError('EventMemberTransactionAgreement not found!');
    Promise.all([
      agreement.transactions.map(transaction => {
        return this.transactionsRepository.delete(transaction.transaction);
      }),
    ]);
    await this.eventMemberTransactionAgreementsRepository.delete(agreement);
  }
}

export default DeleteEventMemberTransactionAgreementService;
