import { injectable, inject } from 'tsyringe';

import IEventOwnerTransactionAgreementsRepository from '@modules/transactions/repositories/IEventOwnerTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class DeleteEventOwnerTransactionAgreementService {
  constructor(
    @inject('EventOwnerTransactionAgreementsRepository')
    private eventOwnerTransactionAgreementsRepository: IEventOwnerTransactionAgreementsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const agreement = await this.eventOwnerTransactionAgreementsRepository.findById(
      id,
    );

    if (!agreement)
      throw new AppError('EventOwnerTransactionAgreement not found!');
    Promise.all([
      agreement.transactions.map(transaction => {
        return this.transactionsRepository.delete(transaction.transaction);
      }),
    ]);
    await this.eventOwnerTransactionAgreementsRepository.delete(agreement);
  }
}

export default DeleteEventOwnerTransactionAgreementService;
