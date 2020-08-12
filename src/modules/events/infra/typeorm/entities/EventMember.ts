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

@Entity('event_members')
class EventMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_name: string;

  @ManyToOne(() => Event, event => event.name)
  @JoinColumn({ name: 'event_name' })
  events: Event;

  @Column()
  member_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'member_id' })
  userId: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventMember;
