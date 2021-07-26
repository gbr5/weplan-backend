import { injectable, inject } from 'tsyringe';

import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class DeleteEventSupplierTransactionAgreementService {
  constructor(
    @inject('EventSupplierTransactionAgreementsRepository')
    private eventSupplierTransactionAgreementsRepository: IEventSupplierTransactionAgreementsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const agreement = await this.eventSupplierTransactionAgreementsRepository.findById(
      id,
    );

    if (!agreement)
      throw new AppError('EventSupplierTransactionAgreement not found!');
    Promise.all([
      agreement.transactions.map(transaction => {
        return this.transactionsRepository.delete(transaction.transaction);
      }),
    ]);
    await this.eventSupplierTransactionAgreementsRepository.delete(agreement);
  }
}

export default DeleteEventSupplierTransactionAgreementService;
