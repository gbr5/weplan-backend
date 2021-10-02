import TransactionNote from '@modules/notes/infra/typeorm/entities/TransactionNote';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import EventMemberTransaction from './EventMemberTransaction';
import EventOwnerTransaction from './EventOwnerTransaction';
import EventSupplierTransaction from './EventSupplierTransaction';
import TransactionFile from './TransactionFile';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column('numeric')
  amount: number;

  @Column('timestamp')
  due_date: Date;

  @Column('boolean')
  isPaid: boolean;

  @Column('boolean')
  isCancelled: boolean;

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

  @OneToMany(
    () => TransactionNote,
    transactionNote => transactionNote.transaction,
    // { eager: true },
  )
  notes: TransactionNote;

  @OneToMany(
    () => TransactionFile,
    transactionFile => transactionFile.transaction,
    { eager: true },
  )
  files: TransactionFile;

  @OneToOne(
    () => EventMemberTransaction,
    eventMember => eventMember.transaction,
  )
  eventMemberTransaction: EventMemberTransaction;

  @OneToOne(() => EventOwnerTransaction, eventOwner => eventOwner.transaction)
  eventOwnerTransaction: EventOwnerTransaction;
}

export default Transaction;
