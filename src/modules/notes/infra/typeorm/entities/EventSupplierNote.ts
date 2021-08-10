import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Note from './Note';

@Entity('event_supplier_notes')
class EventSupplierNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  note_id: string;

  @ManyToOne(() => Note, note => note.eventSupplierNotes, { eager: true })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @Column('uuid')
  supplier_id: string;

  @ManyToOne(() => EventSupplier, supplier => supplier.notes)
  @JoinColumn({ name: 'supplier_id' })
  eventSupplier: EventSupplier;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventSupplierNote;
