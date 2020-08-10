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

import User from '@modules/users/infra/typeorm/entities/User';
import EventType from './EventType';
import SelectedSupplier from './SelectedSupplier';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  trimmed_name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @Column()
  event_type: string;

  @ManyToOne(() => EventType, event_type => event_type.name)
  @JoinColumn({ name: 'event_type' })
  eventType: EventType;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(
    () => SelectedSupplier,
    selected_supplier => selected_supplier.event_name,
  )
  selected_suppliers: string;
}

export default Event;
