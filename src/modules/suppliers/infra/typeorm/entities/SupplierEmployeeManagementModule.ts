import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import WeplanManagementModule from '@modules/weplan/infra/typeorm/entities/WeplanManagementModule';
import CompanyEmployee from './CompanyEmployee';

@Entity('company_employee_management_modules')
class SupplierEmployeeManagementModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  supplier_employee_id: string;

  @ManyToOne(() => CompanyEmployee)
  @JoinColumn({ name: 'supplier_employee_id' })
  supplierEmployee: CompanyEmployee;

  @Column('uuid')
  management_module_id: string;

  @ManyToOne(() => WeplanManagementModule, { eager: true })
  @JoinColumn({ name: 'management_module_id' })
  managementModule: WeplanManagementModule;

  @Column('integer')
  access_level: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SupplierEmployeeManagementModule;
