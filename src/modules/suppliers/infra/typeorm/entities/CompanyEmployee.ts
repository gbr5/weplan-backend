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
// import UserManagementModule from '@modules/users/infra/typeorm/entities/UserManagementModule';
// import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';

@Entity('company_employees')
class CompanyEmployee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  access_key: string;

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

  // @OneToMany(
  //   () => UserManagementModule,
  //   managementModule => managementModule.companyEmployee,
  //   {
  //     cascade: true,
  //     eager: true,
  //   },
  // )
  // modules: UserManagementModule[];

  // @OneToMany(
  //   () => UserConfirmation,
  //   confirmation => confirmation.employeeReceiver,
  //   {
  //     cascade: true,
  //     eager: true,
  //   },
  // )
  // confirmation: UserConfirmation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyEmployee;
