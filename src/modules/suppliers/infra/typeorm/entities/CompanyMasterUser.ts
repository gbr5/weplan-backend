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

@Entity('company_master_users')
class CompanyMasterUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.masterUsers, { eager: true })
  @JoinColumn({ name: 'user_id' })
  masterUser: User;

  @Column('uuid')
  company_id: string;

  @ManyToOne(() => User, company => company.companyMasterUsers, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column('boolean')
  isConfirmed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyMasterUser;
