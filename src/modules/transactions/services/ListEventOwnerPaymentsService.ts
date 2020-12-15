import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventOwnerPayment from '@modules/transactions/infra/typeorm/entities/EventOwnerPayment';
import IEventOwnerPaymentsRepository from '@modules/transactions/repositories/IEventOwnerPaymentsRepository';

@injectable()
class ListEventOwnerPaymentsService {
  constructor(
    @inject('EventOwnerPaymentsRepository')
    private eventOwnerPaymentsRepository: IEventOwnerPaymentsRepository,
  ) {}

  public async execute(event_owner_id: string): Promise<EventOwnerPayment[]> {
    const eventOwnerPayments = await this.eventOwnerPaymentsRepository.findByOwner(
      event_owner_id,
    );

    return eventOwnerPayments;
  }
}

export default ListEventOwnerPaymentsService;
