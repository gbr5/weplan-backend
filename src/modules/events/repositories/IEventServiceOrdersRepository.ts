import EventServiceOrder from '@modules/events/infra/typeorm/entities/EventServiceOrder';
import ICreateEventServiceOrderDTO from '@modules/events/dtos/ICreateEventServiceOrderDTO';

export default interface IEventServiceOrdersRepository {
  create(data: ICreateEventServiceOrderDTO): Promise<EventServiceOrder>;
  findByEvent(event_id: string): Promise<EventServiceOrder[]>;
  findByServiceOrderId(
    customer_service_order_id: string,
  ): Promise<EventServiceOrder | undefined>;
  findById(id: string): Promise<EventServiceOrder | undefined>;
  save(data: EventServiceOrder): Promise<EventServiceOrder>;
  delete(data: EventServiceOrder): Promise<void>;
}
