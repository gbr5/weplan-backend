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
import CompanyContactInfo from './CompanyContactInfo';

@Entity('company_contacts')
class CompanyContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  company_id: string;

  @ManyToOne(() => User, company => company.contacts, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  company_contact_type: string;

  @Column('boolean')
  weplanUser: boolean;

  @Column('boolean')
  isCompany: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => CompanyContactInfo,
    contactInfo => contactInfo.companyContact,
    { eager: true },
  )
  contact_infos: CompanyContactInfo[];
}

export default CompanyContact;
