import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('user_management_modules')
class UserManagementModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  management_module: string;

  @Column('integer')
  access_level: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToOne(() => CompanyEmployee)
  // @JoinColumn({ name: 'user_id' })
  // companyEmployee: CompanyEmployee;
}

export default UserManagementModule;
