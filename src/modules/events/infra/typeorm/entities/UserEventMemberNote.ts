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
import EventMember from './EventMember';

@Entity('user_event_member_notes')
class UserEventMemberNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_note_id: string;

  @ManyToOne(() => EventNote, note => note.eventMemberNotes)
  @JoinColumn({ name: 'event_note_id' })
  eventMemberNote: EventNote;

  @Column('uuid')
  member_id: string;

  @ManyToOne(() => EventMember, member => member.memberNotes)
  @JoinColumn({ name: 'member_id' })
  memberNote: EventMember;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserEventMemberNote;
