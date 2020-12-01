import { getRepository, Repository } from 'typeorm';

import IEventServiceOrdersRepository from '@modules/events/repositories/IEventServiceOrdersRepository';
import ICreateEventServiceOrderDTO from '@modules/events/dtos/ICreateEventServiceOrderDTO';
import EventServiceOrder from '@modules/events/infra/typeorm/entities/EventServiceOrder';

class EventServiceOrdersRepository implements IEventServiceOrdersRepository {
  private ormRepository: Repository<EventServiceOrder>;

  constructor() {
    this.ormRepository = getRepository(EventServiceOrder);
  }

  public async findByEventAndServiceOrderId(
    event_id: string,
    customer_service_order_id: string,
  ): Promise<EventServiceOrder | undefined> {
    const customer_service_order = await this.ormRepository.findOne({
      where: { event_id, customer_service_order_id },
    });
    return customer_service_order;
  }

  public async findByEvent(event_id: string): Promise<EventServiceOrder[]> {
    const customer_service_orders = await this.ormRepository.find({
      where: { event_id },
    });

    return customer_service_orders;
  }

  public async findByServiceOrderId(
    customer_service_order_id: string,
  ): Promise<EventServiceOrder | undefined> {
    const customer_service_order = await this.ormRepository.findOne({
      where: { customer_service_order_id },
    });

    return customer_service_order;
  }

  public async findById(id: string): Promise<EventServiceOrder | undefined> {
    const event = await this.ormRepository.findOne(id);

    return event;
  }

  public async create(
    data: ICreateEventServiceOrderDTO,
  ): Promise<EventServiceOrder> {
    const customer_service_order = this.ormRepository.create(data);

    await this.ormRepository.save(customer_service_order);

    return customer_service_order;
  }

  public async save(
    customer_service_order: EventServiceOrder,
  ): Promise<EventServiceOrder> {
    return this.ormRepository.save(customer_service_order);
  }

  public async delete(data: EventServiceOrder): Promise<void> {
    await this.ormRepository.delete(data);
  }
}

export default EventServiceOrdersRepository;
