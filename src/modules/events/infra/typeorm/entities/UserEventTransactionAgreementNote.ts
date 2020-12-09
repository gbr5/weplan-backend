import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import TransactionAgreement from '@modules/finances/infra/typeorm/entities/TransactionAgreement';
import EventNote from './EventNote';

@Entity('user_event_transaction_agreement_notes')
class UserEventTransactionAgreementNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_note_id: string;

  @ManyToOne(() => EventNote, note => note.eventTransactionAgreementNotes)
  @JoinColumn({ name: 'event_note_id' })
  eventTransactionAgreementNote: EventNote;

  @Column('uuid')
  transaction_agreement_id: string;

  @ManyToOne(
    () => TransactionAgreement,
    transactionAgreement => transactionAgreement.transactionAgreementNotes,
  )
  @JoinColumn({ name: 'transaction_agreement_id' })
  transactionAgreementNote: TransactionAgreement;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserEventTransactionAgreementNote;
