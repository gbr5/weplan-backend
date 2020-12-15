import { injectable, inject } from 'tsyringe';

import EventMemberPayment from '@modules/transactions/infra/typeorm/entities/EventMemberPayment';
import IEventMemberPaymentsRepository from '@modules/transactions/repositories/IEventMemberPaymentsRepository';
import ICreateEventMemberPaymentDTO from '../dtos/ICreateEventMemberPaymentDTO';

@injectable()
class CreateEventMemberPaymentService {
  constructor(
    @inject('EventMemberPaymentsRepository')
    private eventMemberPaymentsRepository: IEventMemberPaymentsRepository,
  ) {}

  public async execute(
    data: ICreateEventMemberPaymentDTO,
  ): Promise<EventMemberPayment> {
    const eventMemberPayment = await this.eventMemberPaymentsRepository.create(
      data,
    );

    return eventMemberPayment;
  }
}

export default CreateEventMemberPaymentService;
