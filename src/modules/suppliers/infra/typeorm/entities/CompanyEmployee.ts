import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('company_employees')
class CompanyEmployee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  employee_id: string;

  @ManyToOne(() => User, employee => employee.id)
  @JoinColumn({ name: 'employee_id' })
  Employee: User;

  @Column('uuid')
  company_id: string;

  @ManyToOne(() => User, company => company.id)
  @JoinColumn({ name: 'company_id' })
  Company: User;

  @Column()
  position: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyEmployee;