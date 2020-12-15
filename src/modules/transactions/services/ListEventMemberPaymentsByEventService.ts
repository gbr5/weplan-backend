import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventMemberPayment from '@modules/transactions/infra/typeorm/entities/EventMemberPayment';
import IEventMemberPaymentsRepository from '@modules/transactions/repositories/IEventMemberPaymentsRepository';

@injectable()
class ListEventMemberPaymentsService {
  constructor(
    @inject('EventMemberPaymentsRepository')
    private eventMemberPaymentsRepository: IEventMemberPaymentsRepository,
  ) {}

  public async execute(event_id: string): Promise<EventMemberPayment[]> {
    const eventMemberPayments = await this.eventMemberPaymentsRepository.findByEvent(
      event_id,
    );

    return eventMemberPayments;
  }
}

export default ListEventMemberPaymentsService;
