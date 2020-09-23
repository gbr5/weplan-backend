import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import TransactionAgreement from '@modules/finances/infra/typeorm/entities/TransactionAgreement';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  agreement_id: string;

  @ManyToOne(() => TransactionAgreement, agreement => agreement.id)
  @JoinColumn({ name: 'agreement_id' })
  TransactionAgreement: TransactionAgreement;

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
}

export default Transaction;
