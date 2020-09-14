import EventWeplanSupplier from '@modules/events/infra/typeorm/entities/EventWeplanSupplier';
import ICreateEventWeplanSupplierDTO from '@modules/events/dtos/ICreateEventWeplanSupplierDTO';

export default interface IEventWeplanSupplierRepository {
  findById(id: string): Promise<EventWeplanSupplier | undefined>;
  findByEventId(event_id: string): Promise<EventWeplanSupplier[]>;
  findByEventAndEventSupplierId(
    event_id: string,
    event_supplier_id: string,
  ): Promise<EventWeplanSupplier | undefined>;
  create(data: ICreateEventWeplanSupplierDTO): Promise<EventWeplanSupplier>;
  save(eventWeplanSupplier: EventWeplanSupplier): Promise<EventWeplanSupplier>;
  delete(id: string): Promise<void>;
}
