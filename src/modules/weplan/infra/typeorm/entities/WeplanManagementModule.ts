import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import SupplierEmployeeManagementModule from '@modules/suppliers/infra/typeorm/entities/SupplierEmployeeManagementModule';

@Entity('weplan_management_modules')
class WeplanManagementManagement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => SupplierEmployeeManagementModule, module => module)
  modules: SupplierEmployeeManagementModule;
}

export default WeplanManagementManagement;
