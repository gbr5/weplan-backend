import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import ContactFile from '@modules/users/infra/typeorm/entities/ContactFile';
import CompanyContactInfo from './CompanyContactInfo';
import CompanyContactWeplanUser from './CompanyContactWeplanUser';
import CardCurstomer from './CardCustomer';
import CustomerServiceOrder from './CustomerServiceOrder';
import CardOutsideParticipant from './CardOutsideParticipant';

@Entity('company_contacts')
class CompanyContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  company_id: string;

  @OneToOne(() => User, company => company.contacts_company, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column()
  name: string;

  @Column()
  family_name: string;

  @Column()
  description: string;

  @Column()
  company_contact_type: string;

  @Column('boolean')
  weplanUser: boolean;

  @Column('boolean')
  isCompany: boolean;

  @Column('boolean')
  isNew: boolean;

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

  @OneToOne(() => CompanyContactWeplanUser, contact => contact.companyContact)
  companyContactWeplanUser: CompanyContactWeplanUser;

  @OneToMany(() => CardCurstomer, contactInfo => contactInfo.customer)
  customers: CardCurstomer[];

  @OneToMany(() => CustomerServiceOrder, contactInfo => contactInfo.customer)
  customerServiceOrders: CustomerServiceOrder[];

  @OneToMany(
    () => CardOutsideParticipant,
    contactInfo => contactInfo.outsideParticipant,
  )
  cardOutsideParticipants: CardOutsideParticipant[];

  @OneToMany(() => ContactFile, contactFile => contactFile.contactFile, {
    eager: true,
  })
  fileContacts: ContactFile[];
}

export default CompanyContact;
