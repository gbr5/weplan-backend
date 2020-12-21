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
import EmployeeFile from '@modules/users/infra/typeorm/entities/EmployeeFile';
import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';
// import UserManagementModule from '@modules/users/infra/typeorm/entities/UserManagementModule';
// import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';

@Entity('company_employees')
class CompanyEmployee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  access_key: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  isActive: boolean;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => EmployeeFile, contactFile => contactFile.employeeFile, {
    eager: true,
  })
  fileEmployees: EmployeeFile[];
  // @OneToMany(
  //   () => UserManagementModule,
  //   managementModule => managementModule.companyEmployee,
  //   {
  //     cascade: true,
  //     eager: true,
  //   },
  // )
  // modules: UserManagementModule[];

  @OneToMany(
    () => UserConfirmation,
    confirmation => confirmation.employeeReceiver,
    {
      eager: true,
    },
  )
  confirmations: UserConfirmation[];
}

export default CompanyEmployee;
