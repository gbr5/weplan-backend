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
import EventTask from './EventTask';

@Entity('event_task_followers')
class EventTaskFollower {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.eventTaskFollower, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  follower: User;

  @Column()
  task_id: string;

  @ManyToOne(() => EventTask, task => task.followers)
  @JoinColumn({ name: 'task_id' })
  task: EventTask;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventTaskFollower;
