import { injectable, inject } from 'tsyringe';

import IEventMemberTransactionsRepository from '@modules/transactions/repositories/IEventMemberTransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteEventMemberTransactionService {
  constructor(
    @inject('EventMemberTransactionsRepository')
    private eventMemberTransactionsRepository: IEventMemberTransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const transaction = await this.eventMemberTransactionsRepository.findById(
      id,
    );

    if (!transaction) throw new AppError('EventMemberTransaction not found!');
    await this.eventMemberTransactionsRepository.delete(transaction);
  }
}

export default DeleteEventMemberTransactionService;
