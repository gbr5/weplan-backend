import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import CustomerServiceOrder from '@modules/suppliers/infra/typeorm/entities/CustomerServiceOrder';
import Event from './Event';

@Entity('event_service_orders')
class EventServiceOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.eventServiceOrders, { eager: true })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  customer_service_order_id: string;

  @OneToOne(
    () => CustomerServiceOrder,
    serviceOrder => serviceOrder.eventServiceOrder,
  )
  @JoinColumn({ name: 'customer_service_order_id' })
  serviceOrder: CustomerServiceOrder;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventServiceOrder;
