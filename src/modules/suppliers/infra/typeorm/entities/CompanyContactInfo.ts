import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import CompanyContact from '@modules/suppliers/infra/typeorm/entities/CompanyContact';

@Entity('company_contact_infos')
class CompanyContactInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  company_contact_id: string;

  @ManyToOne(() => CompanyContact, contact => contact.contact_infos)
  @JoinColumn({ name: 'company_contact_id' })
  companyContact: CompanyContact;

  @Column()
  info_type: string;

  @Column()
  info: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyContactInfo;
