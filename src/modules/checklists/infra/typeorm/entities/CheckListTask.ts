import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import CheckListTaskNote from '@modules/notes/infra/typeorm/entities/CheckListTaskNote';

@Entity('check_list_tasks')
class CheckListTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  owner_id: string;

  @ManyToOne(() => User, owner => owner, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column('uuid')
  check_list_id: string;

  @ManyToOne(() => CheckList, check_list => check_list.tasks)
  @JoinColumn({ name: 'check_list_id' })
  check_list: CheckList;

  @Column()
  task: string;

  @Column()
  color: string;

  @Column('boolean')
  isActive: boolean;

  @Column()
  priority: string;

  @Column()
  status: string;

  @Column()
  due_date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => CheckListTaskNote, note => note.task, { eager: true })
  notes: CheckListTaskNote[];
}

export default CheckListTask;
