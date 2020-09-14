import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import EventSupplier from './EventSupplier';
import Event from './Event';

@Entity('event_weplan_suppliers')
class EventWeplanSupplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.id)
  @JoinColumn({ name: 'event_id' })
  Event: Event;

  @Column('uuid')
  event_supplier_id: string;

  @ManyToOne(() => EventSupplier, eventSupplier => eventSupplier.id)
  @JoinColumn({ name: 'event_supplier_id' })
  EventSupplier: EventSupplier;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventWeplanSupplier;
