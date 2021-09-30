import Task from '@modules/tasks/infra/typeorm/entities/Task';
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

  @ManyToOne(() => Event, event => event.tasks)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  task_id: string;

  @ManyToOne(() => Task, task => task.eventTasks, { eager: true })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventTask;
