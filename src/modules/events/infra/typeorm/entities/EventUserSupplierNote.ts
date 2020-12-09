import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';

import EventNote from './EventNote';
import EventSupplier from './EventSupplier';

@Entity('event_user_supplier_notes')
class EventUserSupplierNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_note_id: string;

  @OneToMany(() => EventNote, note => note.eventUserSupplierNotes)
  @JoinColumn({ name: 'event_note_id' })
  eventNote: EventNote;

  @Column('uuid')
  event_supplier_id: string;

  @OneToMany(
    () => EventSupplier,
    eventSupplier => eventSupplier.eventSupplierNotes,
  )
  @JoinColumn({ name: 'event_supplier_id' })
  eventSupplierNote: EventSupplier;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventUserSupplierNote;
