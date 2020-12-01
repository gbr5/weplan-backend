import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventServiceOrder from '@modules/events/infra/typeorm/entities/EventServiceOrder';
import IEventServiceOrdersRepository from '@modules/events/repositories/IEventServiceOrdersRepository';
import ICustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICustomerServiceOrdersRepository';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  customer_service_order_id: string;
  event_id: string;
}

@injectable()
class CreateEventServiceOrderService {
  constructor(
    @inject('EventServiceOrdersRepository')
    private eventServiceOrdersRepository: IEventServiceOrdersRepository,

    @inject('CustomerServiceOrdersRepository')
    private customerServiceOrdersRepository: ICustomerServiceOrdersRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    customer_service_order_id,
    event_id,
  }: IRequest): Promise<EventServiceOrder> {
    const eventExists = await this.eventsRepository.findById(event_id);

    if (!eventExists) {
      throw new AppError('Event not found.');
    }

    const customerServiceOrderExists = await this.customerServiceOrdersRepository.findById(
      customer_service_order_id,
    );

    if (!customerServiceOrderExists) {
      throw new AppError('Customer Service Order not found!');
    }
    const eventServiceOrderExists = await this.eventServiceOrdersRepository.findByServiceOrderId(
      customer_service_order_id,
    );

    if (eventServiceOrderExists) {
      throw new AppError('Event Service Order already exists, already exists.');
    }

    const eventServiceOrder = await this.eventServiceOrdersRepository.create({
      customer_service_order_id,
      event_id,
    });

    return eventServiceOrder;
  }
}

export default CreateEventServiceOrderService;
