import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventMemberPaymentTransaction from '@modules/transactions/infra/typeorm/entities/EventMemberPaymentTransaction';
import IEventMemberPaymentTransactionsRepository from '@modules/transactions/repositories/IEventMemberPaymentTransactionsRepository';

@injectable()
class ListEventMemberPaymentTransactionsService {
  constructor(
    @inject('EventMemberPaymentTransactionsRepository')
    private eventMemberPaymentTransactionsRepository: IEventMemberPaymentTransactionsRepository,
  ) {}

  public async execute(
    payment_id: string,
  ): Promise<EventMemberPaymentTransaction[]> {
    const eventMemberPaymentTransactions = await this.eventMemberPaymentTransactionsRepository.findByMemberPayment(
      payment_id,
    );

    return eventMemberPaymentTransactions;
  }
}

export default ListEventMemberPaymentTransactionsService;
