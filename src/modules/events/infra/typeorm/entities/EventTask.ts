import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Event from './Event';

@Entity('event_tasks')
class EventTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.eventTasks)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  title: string;

  @Column()
  priority: string;

  @Column()
  status: string;

  @Column('timestamp with time zone')
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventTask;
