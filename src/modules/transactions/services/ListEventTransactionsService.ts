import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventTransaction from '@modules/transactions/infra/typeorm/entities/EventTransaction';
import IEventTransactionsRepository from '@modules/transactions/repositories/IEventTransactionsRepository';

@injectable()
class ListEventTransactionsService {
  constructor(
    @inject('EventTransactionsRepository')
    private eventTransactionsRepository: IEventTransactionsRepository,
  ) {}

  public async execute(event_id: string): Promise<EventTransaction[]> {
    const eventTransactions = await this.eventTransactionsRepository.findByEvent(
      event_id,
    );

    return eventTransactions;
  }
}

export default ListEventTransactionsService;
