import { injectable, inject } from 'tsyringe';

import EventTransaction from '@modules/transactions/infra/typeorm/entities/EventTransaction';
import IEventTransactionsRepository from '@modules/transactions/repositories/IEventTransactionsRepository';
import ICreateEventTransactionDTO from '../dtos/ICreateEventTransactionDTO';

@injectable()
class CreateEventTransactionService {
  constructor(
    @inject('EventTransactionsRepository')
    private eventTransactionsRepository: IEventTransactionsRepository,
  ) {}

  public async execute(
    data: ICreateEventTransactionDTO,
  ): Promise<EventTransaction> {
    const eventTransaction = await this.eventTransactionsRepository.create(
      data,
    );

    return eventTransaction;
  }
}

export default CreateEventTransactionService;
