import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventOwnerPaymentTransaction from '@modules/transactions/infra/typeorm/entities/EventOwnerPaymentTransaction';
import IEventOwnerPaymentTransactionsRepository from '@modules/transactions/repositories/IEventOwnerPaymentTransactionsRepository';

@injectable()
class ListEventOwnerPaymentTransactionsService {
  constructor(
    @inject('EventOwnerPaymentTransactionsRepository')
    private eventOwnerPaymentTransactionsRepository: IEventOwnerPaymentTransactionsRepository,
  ) {}

  public async execute(
    payment_id: string,
  ): Promise<EventOwnerPaymentTransaction[]> {
    const eventOwnerPaymentTransactions = await this.eventOwnerPaymentTransactionsRepository.findByOwnerPayment(
      payment_id,
    );

    return eventOwnerPaymentTransactions;
  }
}

export default ListEventOwnerPaymentTransactionsService;
