import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import ICreateEventSupplierDTO from '@modules/events/dtos/ICreateEventSupplierDTO';

export default interface IEventSupplierRepository {
  findById(id: string): Promise<EventSupplier | undefined>;
  findByEvent(event_id: string): Promise<EventSupplier[]>;
  findByEventAndIsHired(event_id: string): Promise<EventSupplier[]>;
  findByNameAndEvent(
    event_id: string,
    name: string,
  ): Promise<EventSupplier | undefined>;
  create(data: ICreateEventSupplierDTO): Promise<EventSupplier>;
  save(eventSupplier: EventSupplier): Promise<EventSupplier>;
  delete(id: string): Promise<void>;
}
