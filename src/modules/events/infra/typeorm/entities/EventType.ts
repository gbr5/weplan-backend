import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import SupplierProduct from '@modules/suppliers/infra/typeorm/entities/SupplierProduct';
import EventTypeSupplier from './EventTypeSupplier';
import Event from './Event';

@Entity('event_types')
class EventTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Event, event => event.event_type)
  events: Event[];

  @OneToMany(
    () => EventTypeSupplier,
    event_type_supplier => event_type_supplier.event_type,
  )
  eventTypeSuppliers: EventTypeSupplier[];

  @OneToMany(
    () => SupplierProduct,
    supplierProduct => supplierProduct.event_type_id,
  )
  supplierProducts: SupplierProduct[];
}

export default EventTypes;
