import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnerPaymentsRepository from '@modules/transactions/repositories/IEventOwnerPaymentsRepository';

import EventOwnerPayment from '@modules/transactions/infra/typeorm/entities/EventOwnerPayment';

interface IEventOwnerPaymentDTO {
  id: string;
  due_date: Date;
  description: string;
  isPaid: boolean;
  value: number;
}

@injectable()
class UpdateEventOwnerPaymentService {
  constructor(
    @inject('EventOwnerPaymentsRepository')
    private eventOwnerPaymentsRepository: IEventOwnerPaymentsRepository,
  ) {}

  public async execute({
    id,
    due_date,
    description,
    isPaid,
    value,
  }: IEventOwnerPaymentDTO): Promise<EventOwnerPayment> {
    const eventOwnerPayment = await this.eventOwnerPaymentsRepository.findById(
      id,
    );

    if (!eventOwnerPayment) {
      throw new AppError('EventOwnerPayment not found.');
    }
    eventOwnerPayment.due_date = due_date;
    eventOwnerPayment.description = description;
    eventOwnerPayment.isPaid = isPaid;
    eventOwnerPayment.value = value;

    const updatedEventOwnerPayment = await this.eventOwnerPaymentsRepository.save(
      eventOwnerPayment,
    );

    return updatedEventOwnerPayment;
  }
}

export default UpdateEventOwnerPaymentService;
