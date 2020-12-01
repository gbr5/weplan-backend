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

import User from '@modules/users/infra/typeorm/entities/User';
import CustomerServiceOrderFieldAnswer from './CustomerServiceOrderFieldAnswer';

@Entity('company_default_service_order_fields')
class CompanyDefaultServiceOrderField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  company_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column()
  field_name: string;

  @Column()
  field_type: string;

  @Column('boolean')
  isRequired: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(
    () => CustomerServiceOrderFieldAnswer,
    fieldAnswer => fieldAnswer.companyDefaultServiceOrderField,
  )
  fieldAnswer: CustomerServiceOrderFieldAnswer;
}

export default CompanyDefaultServiceOrderField;
