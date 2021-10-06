import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Event from './Event';
import EventMemberMonthlyPaymentAgreement from './EventMemberMonthlyPaymentAgreement';
import EventOwnerMonthlyPaymentAgreement from './EventOwnerMonthlyPaymentAgreement';

@Entity('event_monthly_payment_agreements')
class EventMonthlyPaymentAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  event_id: string;

  @OneToOne(() => Event, event => event.eventBudget)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('numeric')
  monthly_payment: number;

  @Column('numeric')
  number_of_installments: number;

  @Column()
  start_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => EventMemberMonthlyPaymentAgreement,
    memberAgreement => memberAgreement.monthlyPayment,
    { eager: true },
  )
  memberAgreements: EventMemberMonthlyPaymentAgreement[];

  @OneToMany(
    () => EventOwnerMonthlyPaymentAgreement,
    ownerAgreement => ownerAgreement.monthlyPayment,
    { eager: true },
  )
  ownerAgreements: EventOwnerMonthlyPaymentAgreement[];
}

export default EventMonthlyPaymentAgreement;
