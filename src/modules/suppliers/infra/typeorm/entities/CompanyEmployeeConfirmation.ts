import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import CompanyEmployee from './CompanyEmployee';

@Entity('company_employee_confirmation')
class CompanyEmployeeConfirmation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  company_employee_id: string;

  @OneToOne(() => CompanyEmployee)
  @JoinColumn({ name: 'company_employee_id' })
  companyEmployee: CompanyEmployee;

  @Column()
  request_message: string;

  @Column('boolean')
  isConfirmed: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyEmployeeConfirmation;
