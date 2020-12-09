import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import Transaction from '@modules/finances/infra/typeorm/entities/Transaction';
import EventNote from './EventNote';

@Entity('user_event_transaction_notes')
class UserEventTransactionNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_note_id: string;

  @ManyToOne(() => EventNote, note => note.eventTransactionNotes)
  @JoinColumn({ name: 'event_note_id' })
  eventTransactionNote: EventNote;

  @Column('uuid')
  transaction_id: string;

  @ManyToOne(() => Transaction, transaction => transaction.transactionNotes)
  @JoinColumn({ name: 'transaction_id' })
  transactionNote: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserEventTransactionNote;
