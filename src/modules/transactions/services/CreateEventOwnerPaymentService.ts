import { injectable, inject } from 'tsyringe';

import EventOwnerPayment from '@modules/transactions/infra/typeorm/entities/EventOwnerPayment';
import IEventOwnerPaymentsRepository from '@modules/transactions/repositories/IEventOwnerPaymentsRepository';
import ICreateEventOwnerPaymentDTO from '../dtos/ICreateEventOwnerPaymentDTO';

@injectable()
class CreateEventOwnerPaymentService {
  constructor(
    @inject('EventOwnerPaymentsRepository')
    private eventOwnerPaymentsRepository: IEventOwnerPaymentsRepository,
  ) {}

  public async execute(
    data: ICreateEventOwnerPaymentDTO,
  ): Promise<EventOwnerPayment> {
    const eventOwnerPayment = await this.eventOwnerPaymentsRepository.create(
      data,
    );

    return eventOwnerPayment;
  }
}

export default CreateEventOwnerPaymentService;
