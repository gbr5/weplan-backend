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
import Guest from './Guest';

@Entity('user_event_guest_notes')
class UserEventGuestNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_note_id: string;

  @ManyToOne(() => EventNote, note => note.eventGuestNotes)
  @JoinColumn({ name: 'event_note_id' })
  eventGuestNote: EventNote;

  @Column('uuid')
  guest_id: string;

  @ManyToOne(() => Guest, guest => guest.guestNotes)
  @JoinColumn({ name: 'guest_id' })
  guestNote: Guest;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserEventGuestNote;
