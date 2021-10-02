import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
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

@Entity('event_owner_notes')
class EventOwnerNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  note_id: string;

  @ManyToOne(() => Note, note => note.eventOwnerNotes, { eager: true })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @Column('uuid')
  owner_id: string;

  @ManyToOne(() => EventOwner, owner => owner.notes)
  @JoinColumn({ name: 'owner_id' })
  eventOwner: EventOwner;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventOwnerNote;
