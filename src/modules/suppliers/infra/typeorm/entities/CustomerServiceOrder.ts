import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import CompanyContact from './CompanyContact';
import CustomerServiceOrderFieldAnswer from './CustomerServiceOrderFieldAnswer';
import CardCustomerServiceOrder from './CardCustomerServiceOrder';

@Entity('customer_service_orders')
class CustomerServiceOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => CompanyContact, contact => contact.customerServiceOrders, {
    eager: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CompanyContact;

  @Column('uuid')
  company_id: string;

  @ManyToOne(() => User, company => company.companyServiceOrders, {
    eager: true,
  })
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column('boolean')
  isResponded: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => CustomerServiceOrderFieldAnswer,
    fieldAnswer => fieldAnswer.customerServiceOrder,
    {
      eager: true,
    },
  )
  defaultFieldAnswers: CustomerServiceOrderFieldAnswer[];

  @OneToMany(
    () => CardCustomerServiceOrder,
    customerServiceOrderCard =>
      customerServiceOrderCard.cardCustomerServiceOrder,
  )
  customerServiceOrderCards: CardCustomerServiceOrder[];
}

export default CustomerServiceOrder;
