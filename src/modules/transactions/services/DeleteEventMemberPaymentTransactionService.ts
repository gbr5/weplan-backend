import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventMemberPaymentTransactionsRepository from '../repositories/IEventMemberPaymentTransactionsRepository';

@injectable()
class DeleteEventMemberPaymentTransactionService {
  constructor(
    @inject('EventMemberPaymentTransactionsRepository')
    private eventMemberPaymentTransactionsRepository: IEventMemberPaymentTransactionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventMemberPaymentTransaction = await this.eventMemberPaymentTransactionsRepository.findById(
      id,
    );

    if (!eventMemberPaymentTransaction) {
      throw new AppError('No card check list found.');
    }

    await this.eventMemberPaymentTransactionsRepository.delete(
      eventMemberPaymentTransaction,
    );
  }
}

export default DeleteEventMemberPaymentTransactionService;
