import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import EventMemberTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventMemberTransactionAgreement';
import Event from './Event';
import EventMonthlyPaymentAgreement from './EventMonthlyPaymentAgreement';

@Entity('event_member_monthly_payment_agreements')
class EventMemberMonthlyPaymentAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_member_agreement_id: string;

  @OneToOne(
    () => EventMemberTransactionAgreement,
    eventMember => eventMember.memberMonthlyPaymentAgreement,
    // {
    //   eager: true,
    // },
  )
  @JoinColumn({ name: 'event_member_agreement_id' })
  eventMemberMonthlyAgreement: Event;

  @Column('uuid')
  monthly_payment_agreement_id: string;

  @ManyToOne(
    () => EventMonthlyPaymentAgreement,
    userMember => userMember.memberAgreements,
  )
  @JoinColumn({ name: 'monthly_payment_agreement_id' })
  monthlyPayment: EventMonthlyPaymentAgreement;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventMemberMonthlyPaymentAgreement;
