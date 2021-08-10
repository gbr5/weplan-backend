import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import Event from '@modules/events/infra/typeorm/entities/Event';
import Note from '@modules/notes/infra/typeorm/entities/Note';

@Entity('event_notes')
class EventNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.notes)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('uuid')
  note_id: string;

  @ManyToOne(() => Note, note => note.eventNote, { eager: true })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventNote;
