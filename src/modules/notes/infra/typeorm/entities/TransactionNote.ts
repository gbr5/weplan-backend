import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  // OneToOne,
} from 'typeorm';
import Note from './Note';

@Entity('transaction_notes')
class TransactionNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  note_id: string;

  @ManyToOne(() => Note, note => note.transactionNote, { eager: true })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @Column('uuid')
  transaction_id: string;

  @ManyToOne(() => Transaction, transaction => transaction.notes)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TransactionNote;
