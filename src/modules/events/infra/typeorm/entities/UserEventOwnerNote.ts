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
import EventOwner from './EventOwner';

@Entity('user_event_owner_notes')
class UserEventOwnerNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_note_id: string;

  @ManyToOne(() => EventNote, note => note.eventOwnerNotes)
  @JoinColumn({ name: 'event_note_id' })
  eventOwnerNote: EventNote;

  @Column('uuid')
  owner_id: string;

  @ManyToOne(() => EventOwner, owner => owner.ownerNotes)
  @JoinColumn({ name: 'owner_id' })
  ownerNote: EventOwner;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserEventOwnerNote;
