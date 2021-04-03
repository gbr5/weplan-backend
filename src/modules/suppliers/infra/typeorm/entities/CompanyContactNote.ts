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

@Entity('company_contact_notes')
class CompanyContactNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  company_contact_id: string;

  @ManyToOne(() => CompanyContact, contact => contact.notes)
  @JoinColumn({ name: 'company_contact_id' })
  companyContact: CompanyContact;

  @Column()
  note: string;

  @Column('boolean')
  isNew: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyContactNote;
