import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import CompanyContact from './CompanyContact';
import CompanyEmployee from './CompanyEmployee';

@Entity('company_employee_contact')
class CompanyEmployeeContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  employee_id: string;

  @OneToOne(() => CompanyEmployee, employee => employee.employeeContact)
  @JoinColumn({ name: 'employee_id' })
  employee: CompanyEmployee;

  @Column('uuid')
  company_contact_id: string;

  @OneToOne(() => CompanyContact, contact => contact.companyEmployeeContact)
  @JoinColumn({ name: 'company_contact_id' })
  companyContact: CompanyContact;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyEmployeeContact;
