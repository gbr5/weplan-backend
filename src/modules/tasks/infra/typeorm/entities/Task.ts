import EventTask from '@modules/events/infra/typeorm/entities/EventTask';
import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import TaskFollower from './TaskFollower';
import TaskNote from './TaskNote';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.userTasks)
  @JoinColumn({ name: 'user_id' })
  user: User;

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

  @OneToMany(() => TaskNote, taskNote => taskNote.task, {
    eager: true,
  })
  notes: TaskNote[];

  @OneToMany(() => TaskFollower, taskFollower => taskFollower.task, {
    eager: true,
  })
  followers: TaskFollower[];

  @OneToMany(() => EventTask, eventTask => eventTask.task)
  eventTasks: EventTask[];
}

export default Task;
