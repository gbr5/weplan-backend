import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import CompanyContact from '@modules/suppliers/infra/typeorm/entities/CompanyContact';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('company_contact_weplan_users')
class CompanyContactWeplanUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  company_contact_id: string;

  @OneToOne(() => CompanyContact, contact => contact.companyContactWeplanUser)
  @JoinColumn({ name: 'company_contact_id' })
  companyContact: CompanyContact;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user)
  @JoinColumn({ name: 'user_id' })
  companyContactWeplanUser: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyContactWeplanUser;
