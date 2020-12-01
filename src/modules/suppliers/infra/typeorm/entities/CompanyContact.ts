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
import CompanyContactInfo from './CompanyContactInfo';
import CompanyContactWeplanUser from './CompanyContactWeplanUser';
import CardCurstomer from './CardCustomer';
import CustomerServiceOrder from './CustomerServiceOrder';

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

  @OneToOne(() => CompanyContactWeplanUser, contact => contact.companyContact)
  companyContactWeplanUser: CompanyContactWeplanUser;

  @OneToMany(() => CardCurstomer, contactInfo => contactInfo.customer)
  customers: CardCurstomer[];

  @OneToMany(() => CustomerServiceOrder, contactInfo => contactInfo.customer)
  customerServiceOrders: CustomerServiceOrder[];
}

export default CompanyContact;
