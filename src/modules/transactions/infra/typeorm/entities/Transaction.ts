import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import EventSupplierTransaction from './EventSupplierTransaction';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  amount: number;

  @Column('timestamp')
  due_date: Date;

  @Column('boolean')
  isPaid: boolean;

  @Column()
  payer_id: string;

  @Column()
  payee_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(
    () => EventSupplierTransaction,
    eventSupplier => eventSupplier.transaction,
  )
  eventSupplierTransaction: EventSupplierTransaction;
}

export default Transaction;
