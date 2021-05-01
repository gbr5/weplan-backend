import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import CheckListTask from './CheckListTask';
import CardCheckList from './CardCheckList';
import EmployeeCheckList from './EmployeeCheckList';

@Entity('check_lists')
class CheckList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column('boolean')
  isActive: boolean;

  @Column()
  priority: string;

  @Column()
  due_date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => CheckListTask, task => task.check_list, { eager: true })
  tasks: CheckListTask[];

  @OneToMany(() => CardCheckList, card => card.check_list_id)
  cards: CardCheckList[];

  @OneToOne(() => EmployeeCheckList, employee => employee.check_list)
  employee: EmployeeCheckList;
}

export default CheckList;
