import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import SupplierEmployeeManagementModule from '@modules/suppliers/infra/typeorm/entities/SupplierEmployeeManagementModule';

@Entity('supplier_employees')
class CompanyEmployee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  employee_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'employee_id' })
  employee: User;

  @Column('uuid')
  company_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column()
  position: string;

  @OneToMany(
    () => SupplierEmployeeManagementModule,
    employee => employee.supplierEmployee,
    {
      cascade: true,
      eager: true,
    },
  )
  modules: SupplierEmployeeManagementModule[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyEmployee;
