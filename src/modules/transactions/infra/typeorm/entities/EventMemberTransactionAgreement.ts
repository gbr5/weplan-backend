import EventMember from '@modules/events/infra/typeorm/entities/EventMember';
import EventMemberMonthlyPaymentAgreement from '@modules/events/infra/typeorm/entities/EventMemberMonthlyPaymentAgreement';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import EventMemberTransaction from './EventMemberTransaction';

@Entity('event_member_transaction_agreements')
class EventMemberTransactionAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  member_id: string;

  @ManyToOne(
    () => EventMember,
    eventMember => eventMember.transactionAgreements,
  )
  @JoinColumn({ name: 'member_id' })
  eventMember: EventMember;

  @Column('numeric')
  amount: number;

  @Column('numeric')
  number_of_installments: number;

  @Column('boolean')
  isCancelled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => EventMemberTransaction, agreement => agreement.agreement, {
    eager: true,
  })
  transactions: EventMemberTransaction[];

  @OneToOne(
    () => EventMemberMonthlyPaymentAgreement,
    agreement => agreement.eventMemberMonthlyAgreement,
  )
  memberMonthlyPaymentAgreement: EventMemberMonthlyPaymentAgreement;
}

export default EventMemberTransactionAgreement;
