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
import EventType from '@modules/events/infra/typeorm/entities/EventType';

@Entity('event_type_suppliers')
class EventTypeSupplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.eventTypeSuppliers, { eager: true })
  @JoinColumn({ name: 'user_id' })
  typeSupplier: User;

  @Column()
  event_type: string;

  @ManyToOne(() => EventType)
  @JoinColumn({ name: 'event_type' })
  eventType: EventType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventTypeSupplier;
