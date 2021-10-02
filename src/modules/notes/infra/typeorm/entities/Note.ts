import EventNote from '@modules/events/infra/typeorm/entities/EventNote';
import TaskNote from '@modules/tasks/infra/typeorm/entities/TaskNote';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import CheckListTaskNote from './CheckListTaskNote';
import EventMemberNote from './EventMemberNote';
import EventOwnerNote from './EventOwnerNote';
import EventSupplierNote from './EventSupplierNote';
import TransactionNote from './TransactionNote';

@Entity('notes')
class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  note: string;

  @Column('uuid')
  author_id: string;

  @Column('boolean')
  isNew: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => CheckListTaskNote, note => note.note)
  checkListTaskNote: CheckListTaskNote;

  @OneToOne(() => TaskNote, task => task.note)
  taskNote: TaskNote;

  @OneToOne(() => EventSupplierNote, supplier => supplier.note)
  eventSupplierNotes: EventSupplierNote;

  @OneToOne(() => EventNote, event => event.note)
  eventNote: EventNote;

  @OneToOne(() => TransactionNote, transaction => transaction.note)
  transactionNote: TransactionNote;

  @OneToOne(() => EventOwnerNote, owner => owner.note)
  eventOwnerNotes: EventOwnerNote;

  @OneToOne(() => EventMemberNote, member => member.note)
  eventMemberNotes: EventMemberNote;
}

export default Note;
