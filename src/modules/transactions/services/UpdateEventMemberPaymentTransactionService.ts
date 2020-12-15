import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventMemberPaymentTransactionsRepository from '@modules/transactions/repositories/IEventMemberPaymentTransactionsRepository';

import EventMemberPaymentTransaction from '@modules/transactions/infra/typeorm/entities/EventMemberPaymentTransaction';

interface IEventMemberPaymentTransactionDTO {
  id: string;
  transaction_type: string;
}

@injectable()
class UpdateEventMemberPaymentTransactionService {
  constructor(
    @inject('EventMemberPaymentTransactionsRepository')
    private eventMemberPaymentTransactionsRepository: IEventMemberPaymentTransactionsRepository,
  ) {}

  public async execute({
    id,
    transaction_type,
  }: IEventMemberPaymentTransactionDTO): Promise<
    EventMemberPaymentTransaction
  > {
    const eventMemberPaymentTransaction = await this.eventMemberPaymentTransactionsRepository.findById(
      id,
    );

    if (!eventMemberPaymentTransaction) {
      throw new AppError('EventMemberPaymentTransaction not found.');
    }
    eventMemberPaymentTransaction.transaction_type = transaction_type;

    const updatedEventMemberPaymentTransaction = await this.eventMemberPaymentTransactionsRepository.save(
      eventMemberPaymentTransaction,
    );

    return updatedEventMemberPaymentTransaction;
  }
}

export default UpdateEventMemberPaymentTransactionService;
