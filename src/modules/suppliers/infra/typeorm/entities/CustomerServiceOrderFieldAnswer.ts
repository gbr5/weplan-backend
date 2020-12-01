import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import CompanyDefaultServiceOrderField from './CompanyDefaultServiceOrderField';
import CustomerServiceOrder from './CustomerServiceOrder';

@Entity('customer_service_order_field_answers')
class CustomerServiceOrderFieldAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  company_default_service_order_field_id: string;

  @OneToOne(
    () => CompanyDefaultServiceOrderField,
    defaultServiceOrderField => defaultServiceOrderField.fieldAnswer,
    { eager: true },
  )
  @JoinColumn({ name: 'company_default_service_order_field_id' })
  companyDefaultServiceOrderField: CompanyDefaultServiceOrderField;

  @Column('uuid')
  customer_service_order_id: string;

  @ManyToOne(
    () => CustomerServiceOrder,
    customerServiceOrder => customerServiceOrder.defaultFieldAnswers,
  )
  @JoinColumn({ name: 'customer_service_order_id' })
  customerServiceOrder: CustomerServiceOrder;

  @Column()
  answer: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CustomerServiceOrderFieldAnswer;
