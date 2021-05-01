import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';

@Entity('employee_check_list')
class EmployeeCheckList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  check_list_id: string;

  @OneToOne(() => CheckList, check_list => check_list.employee, { eager: true })
  @JoinColumn({ name: 'check_list_id' })
  check_list: CheckList;

  @Column('uuid')
  employee_id: string;

  @OneToOne(() => CompanyEmployee, employee => employee.checkList)
  @JoinColumn({ name: 'employee_id' })
  employee: CompanyEmployee;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EmployeeCheckList;
