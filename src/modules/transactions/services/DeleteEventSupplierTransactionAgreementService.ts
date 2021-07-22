import { injectable, inject } from 'tsyringe';

import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteEventSupplierTransactionAgreementService {
  constructor(
    @inject('EventSupplierTransactionAgreementsRepository')
    private transactionsRepository: IEventSupplierTransactionAgreementsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction)
      throw new AppError('EventSupplierTransactionAgreement not found!');
    await this.transactionsRepository.delete(transaction);
  }
}

export default DeleteEventSupplierTransactionAgreementService;
