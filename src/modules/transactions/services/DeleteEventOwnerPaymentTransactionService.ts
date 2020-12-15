import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnerPaymentTransactionsRepository from '../repositories/IEventOwnerPaymentTransactionsRepository';

@injectable()
class DeleteEventOwnerPaymentTransactionService {
  constructor(
    @inject('EventOwnerPaymentTransactionsRepository')
    private eventOwnerPaymentTransactionsRepository: IEventOwnerPaymentTransactionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventOwnerPaymentTransaction = await this.eventOwnerPaymentTransactionsRepository.findById(
      id,
    );

    if (!eventOwnerPaymentTransaction) {
      throw new AppError('No card check list found.');
    }

    await this.eventOwnerPaymentTransactionsRepository.delete(
      eventOwnerPaymentTransaction,
    );
  }
}

export default DeleteEventOwnerPaymentTransactionService;
