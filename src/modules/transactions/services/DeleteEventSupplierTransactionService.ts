import { injectable, inject } from 'tsyringe';

import IEventSupplierTransactionsRepository from '@modules/transactions/repositories/IEventSupplierTransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteEventSupplierTransactionService {
  constructor(
    @inject('EventSupplierTransactionsRepository')
    private eventSupplierTransactionsRepository: IEventSupplierTransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const transaction = await this.eventSupplierTransactionsRepository.findById(
      id,
    );

    if (!transaction) throw new AppError('EventSupplierTransaction not found!');
    await this.eventSupplierTransactionsRepository.delete(transaction);
  }
}

export default DeleteEventSupplierTransactionService;
