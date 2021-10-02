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
import EventMemberTransactionAgreement from './EventMemberTransactionAgreement';
import Transaction from './Transaction';

@Entity('event_member_transactions')
class EventMemberTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  agreement_id: string;

  @ManyToOne(
    () => EventMemberTransactionAgreement,
    agreement => agreement.transactions,
  )
  @JoinColumn({ name: 'agreement_id' })
  agreement: EventMemberTransactionAgreement;

  @Column()
  transaction_id: string;

  @OneToOne(
    () => Transaction,
    transaction => transaction.eventMemberTransaction,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventMemberTransaction;
