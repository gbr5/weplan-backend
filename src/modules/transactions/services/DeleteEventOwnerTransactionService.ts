import { injectable, inject } from 'tsyringe';

import IEventOwnerTransactionsRepository from '@modules/transactions/repositories/IEventOwnerTransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteEventOwnerTransactionService {
  constructor(
    @inject('EventOwnerTransactionsRepository')
    private eventOwnerTransactionsRepository: IEventOwnerTransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const transaction = await this.eventOwnerTransactionsRepository.findById(
      id,
    );

    if (!transaction) throw new AppError('EventOwnerTransaction not found!');
    await this.eventOwnerTransactionsRepository.delete(transaction);
  }
}

export default DeleteEventOwnerTransactionService;
