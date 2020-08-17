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

@Entity('event_planners')
class EventPlanner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, { eager: true })
  @JoinColumn({ name: 'event_id' })
  Event: Event;

  @Column()
  planner_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'planner_id' })
  Planner: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventPlanner;
