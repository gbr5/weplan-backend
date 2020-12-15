import { injectable, inject } from 'tsyringe';

import EventMemberPaymentTransaction from '@modules/transactions/infra/typeorm/entities/EventMemberPaymentTransaction';
import IEventMemberPaymentTransactionsRepository from '@modules/transactions/repositories/IEventMemberPaymentTransactionsRepository';
import ICreateEventMemberPaymentTransactionDTO from '../dtos/ICreateEventMemberPaymentTransactionDTO';

@injectable()
class CreateEventMemberPaymentTransactionService {
  constructor(
    @inject('EventMemberPaymentTransactionsRepository')
    private eventMemberPaymentTransactionsRepository: IEventMemberPaymentTransactionsRepository,
  ) {}

  public async execute(
    data: ICreateEventMemberPaymentTransactionDTO,
  ): Promise<EventMemberPaymentTransaction> {
    const eventMemberPaymentTransaction = await this.eventMemberPaymentTransactionsRepository.create(
      data,
    );

    return eventMemberPaymentTransaction;
  }
}

export default CreateEventMemberPaymentTransactionService;
