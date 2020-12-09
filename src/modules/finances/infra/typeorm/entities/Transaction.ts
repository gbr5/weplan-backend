import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import TransactionAgreement from '@modules/finances/infra/typeorm/entities/TransactionAgreement';
import UserEventTransactionNote from '@modules/events/infra/typeorm/entities/UserEventTransactionNote';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  agreement_id: string;

  @ManyToOne(() => TransactionAgreement, agreement => agreement.transactions)
  @JoinColumn({ name: 'agreement_id' })
  agreement: TransactionAgreement;

  @Column('numeric')
  amount: number;

  @Column('timestamp')
  due_date: Date;

  @Column('boolean')
  isPaid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => UserEventTransactionNote,
    transaction => transaction.transactionNote,
  )
  transactionNotes: UserEventTransactionNote[];
}

export default Transaction;
