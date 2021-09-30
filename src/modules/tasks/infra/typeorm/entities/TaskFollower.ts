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
import Task from './Task';

@Entity('task_followers')
class TaskFollower {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.taskFollower, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  follower: User;

  @Column()
  task_id: string;

  @ManyToOne(() => Task, task => task.followers)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TaskFollower;
