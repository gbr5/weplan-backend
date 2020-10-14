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

  @Column()
  employee_id: string;

  @ManyToOne(() => User, employee => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee: User;

  @Column()
  company_id: string;

  @ManyToOne(() => User, company => company.id)
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column()
  position: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyEmployee;
