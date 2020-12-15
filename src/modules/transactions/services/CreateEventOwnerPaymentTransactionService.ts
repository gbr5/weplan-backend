import { injectable, inject } from 'tsyringe';

import EventOwnerPaymentTransaction from '@modules/transactions/infra/typeorm/entities/EventOwnerPaymentTransaction';
import IEventOwnerPaymentTransactionsRepository from '@modules/transactions/repositories/IEventOwnerPaymentTransactionsRepository';
import ICreateEventOwnerPaymentTransactionDTO from '../dtos/ICreateEventOwnerPaymentTransactionDTO';

@injectable()
class CreateEventOwnerPaymentTransactionService {
  constructor(
    @inject('EventOwnerPaymentTransactionsRepository')
    private eventOwnerPaymentTransactionsRepository: IEventOwnerPaymentTransactionsRepository,
  ) {}

  public async execute(
    data: ICreateEventOwnerPaymentTransactionDTO,
  ): Promise<EventOwnerPaymentTransaction> {
    const eventOwnerPaymentTransaction = await this.eventOwnerPaymentTransactionsRepository.create(
      data,
    );

    return eventOwnerPaymentTransaction;
  }
}

export default CreateEventOwnerPaymentTransactionService;
