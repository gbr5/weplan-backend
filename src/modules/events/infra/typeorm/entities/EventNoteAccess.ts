import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import EventNote from './EventNote';

@Entity('event_note_access')
class EventNoteAccess {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_note_id: string;

  @ManyToOne(() => EventNote, note => note.eventUserAccessNotes)
  @JoinColumn({ name: 'event_note_id' })
  eventUserAccessNote: EventNote;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.userAccessNotes)
  @JoinColumn({ name: 'user_id' })
  userAccessNote: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventNoteAccess;
