import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnerPaymentTransactionsRepository from '@modules/transactions/repositories/IEventOwnerPaymentTransactionsRepository';

import EventOwnerPaymentTransaction from '@modules/transactions/infra/typeorm/entities/EventOwnerPaymentTransaction';

interface IEventOwnerPaymentTransactionDTO {
  id: string;
  transaction_type: string;
}

@injectable()
class UpdateEventOwnerPaymentTransactionService {
  constructor(
    @inject('EventOwnerPaymentTransactionsRepository')
    private eventOwnerPaymentTransactionsRepository: IEventOwnerPaymentTransactionsRepository,
  ) {}

  public async execute({
    id,
    transaction_type,
  }: IEventOwnerPaymentTransactionDTO): Promise<EventOwnerPaymentTransaction> {
    const eventOwnerPaymentTransaction = await this.eventOwnerPaymentTransactionsRepository.findById(
      id,
    );

    if (!eventOwnerPaymentTransaction) {
      throw new AppError('EventOwnerPaymentTransaction not found.');
    }
    eventOwnerPaymentTransaction.transaction_type = transaction_type;

    const updatedEventOwnerPaymentTransaction = await this.eventOwnerPaymentTransactionsRepository.save(
      eventOwnerPaymentTransaction,
    );

    return updatedEventOwnerPaymentTransaction;
  }
}

export default UpdateEventOwnerPaymentTransactionService;
