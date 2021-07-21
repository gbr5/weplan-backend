import { injectable, inject } from 'tsyringe';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) throw new AppError('Transaction not found!');
    await this.transactionsRepository.delete(transaction);
  }
}

export default DeleteTransactionService;
