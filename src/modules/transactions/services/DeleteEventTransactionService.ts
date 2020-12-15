import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTransactionsRepository from '../repositories/IEventTransactionsRepository';

@injectable()
class DeleteEventTransactionService {
  constructor(
    @inject('EventTransactionsRepository')
    private eventTransactionsRepository: IEventTransactionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventTransaction = await this.eventTransactionsRepository.findById(
      id,
    );

    if (!eventTransaction) {
      throw new AppError('No card check list found.');
    }

    await this.eventTransactionsRepository.delete(eventTransaction);
  }
}

export default DeleteEventTransactionService;
