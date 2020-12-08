import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToOne,
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

  @ManyToOne(() => User, user => user.weplanEventSuppliers, { eager: true })
  @JoinColumn({ name: 'user_id' })
  weplanEventSupplier: User;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.id)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('uuid')
  event_supplier_id: string;

  @OneToOne(() => EventSupplier)
  @JoinColumn({ name: 'event_supplier_id' })
  eventSupplier: EventSupplier;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventWeplanSupplier;
