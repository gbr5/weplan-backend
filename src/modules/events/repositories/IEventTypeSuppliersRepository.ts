import EventTypeSupplier from '@modules/events/infra/typeorm/entities/EventTypeSupplier';
import ICreateEventTypeSupplierDTO from '@modules/events/dtos/ICreateEventTypeSupplierDTO';

export default interface IEventTypeSuppliersRepository {
  create(data: ICreateEventTypeSupplierDTO): Promise<EventTypeSupplier>;
  findByIdAndEventType(
    user_id: string,
    event_type: string,
  ): Promise<EventTypeSupplier | undefined>;
  findByEventType(event_type: string): Promise<EventTypeSupplier[]>;
  save(event: EventTypeSupplier): Promise<EventTypeSupplier>;
  delete(data: ICreateEventTypeSupplierDTO): Promise<void>;
}
