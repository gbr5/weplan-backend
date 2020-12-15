import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventMemberPaymentsRepository from '@modules/transactions/repositories/IEventMemberPaymentsRepository';

import EventMemberPayment from '@modules/transactions/infra/typeorm/entities/EventMemberPayment';

interface IEventMemberPaymentDTO {
  id: string;
  due_date: Date;
  description: string;
  isPaid: boolean;
  value: number;
}

@injectable()
class UpdateEventMemberPaymentService {
  constructor(
    @inject('EventMemberPaymentsRepository')
    private eventMemberPaymentsRepository: IEventMemberPaymentsRepository,
  ) {}

  public async execute({
    id,
    due_date,
    description,
    isPaid,
    value,
  }: IEventMemberPaymentDTO): Promise<EventMemberPayment> {
    const eventMemberPayment = await this.eventMemberPaymentsRepository.findById(
      id,
    );

    if (!eventMemberPayment) {
      throw new AppError('EventMemberPayment not found.');
    }
    eventMemberPayment.due_date = due_date;
    eventMemberPayment.description = description;
    eventMemberPayment.isPaid = isPaid;
    eventMemberPayment.value = value;

    const updatedEventMemberPayment = await this.eventMemberPaymentsRepository.save(
      eventMemberPayment,
    );

    return updatedEventMemberPayment;
  }
}

export default UpdateEventMemberPaymentService;
