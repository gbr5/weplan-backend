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

import EventOwnerTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventOwnerTransactionAgreement';
import Event from './Event';
import EventMonthlyPaymentAgreement from './EventMonthlyPaymentAgreement';

@Entity('event_owner_monthly_payment_agreements')
class EventOwnerMonthlyPaymentAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_owner_agreement_id: string;

  @OneToOne(
    () => EventOwnerTransactionAgreement,
    eventOwner => eventOwner.ownerMonthlyPaymentAgreement,
    // {
    //   eager: true,
    // },
  )
  @JoinColumn({ name: 'event_owner_agreement_id' })
  eventOwnerMonthlyAgreement: Event;

  @Column('uuid')
  monthly_payment_agreement_id: string;

  @ManyToOne(
    () => EventMonthlyPaymentAgreement,
    userOwner => userOwner.ownerAgreements,
  )
  @JoinColumn({ name: 'monthly_payment_agreement_id' })
  monthlyPayment: EventMonthlyPaymentAgreement;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventOwnerMonthlyPaymentAgreement;
