import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Event from './Event';

@Entity('event_owners')
class EventOwner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, { eager: true })
  @JoinColumn({ name: 'event_id' })
  Event: Event;

  @Column()
  owner_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  Owner: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventOwner;
