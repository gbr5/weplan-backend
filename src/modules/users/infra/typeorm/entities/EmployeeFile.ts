import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import UserFile from './UserFile';

@Entity('employee_files')
class EmployeeFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  file_id: string;

  @ManyToOne(() => UserFile, file => file.employeeFiles, { eager: true })
  @JoinColumn({ name: 'file_id' })
  file: UserFile;

  @Column('uuid')
  employee_id: string;

  @ManyToOne(() => CompanyEmployee, contact => contact.files)
  @JoinColumn({ name: 'employee_id' })
  employee: CompanyEmployee;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EmployeeFile;
