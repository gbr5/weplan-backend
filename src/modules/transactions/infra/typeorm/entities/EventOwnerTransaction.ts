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
import EventOwnerTransactionAgreement from './EventOwnerTransactionAgreement';
import Transaction from './Transaction';

@Entity('event_owner_transactions')
class EventOwnerTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  agreement_id: string;

  @ManyToOne(
    () => EventOwnerTransactionAgreement,
    agreement => agreement.transactions,
  )
  @JoinColumn({ name: 'agreement_id' })
  agreement: EventOwnerTransactionAgreement;

  @Column()
  transaction_id: string;

  @OneToOne(
    () => Transaction,
    transaction => transaction.eventOwnerTransaction,
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

export default EventOwnerTransaction;
