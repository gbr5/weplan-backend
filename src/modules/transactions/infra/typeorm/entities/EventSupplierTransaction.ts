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
import EventSupplierTransactionAgreement from './EventSupplierTransactionAgreement';
import Transaction from './Transaction';

@Entity('event_supplier_transactions')
class EventSupplierTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  agreement_id: string;

  @ManyToOne(
    () => EventSupplierTransactionAgreement,
    agreement => agreement.transactions,
  )
  @JoinColumn({ name: 'agreement_id' })
  eventSupplier: EventSupplierTransactionAgreement;

  @Column()
  transaction_id: string;

  @OneToOne(
    () => Transaction,
    transaction => transaction.eventSupplierTransaction,
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

export default EventSupplierTransaction;
