import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import ICreateEventSupplierDTO from '@modules/events/dtos/ICreateEventSupplierDTO';

export default interface IEventSupplierRepository {
  findByIdAndEvent(
    data: ICreateEventSupplierDTO,
  ): Promise<EventSupplier | undefined>;
  findByEvent(event_name: string): Promise<EventSupplier[]>;
  create(data: ICreateEventSupplierDTO): Promise<EventSupplier>;
  save(eventSupplier: EventSupplier): Promise<EventSupplier>;
  delete(data: ICreateEventSupplierDTO): Promise<void>;
}
