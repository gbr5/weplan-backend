import EventMember from '@modules/events/infra/typeorm/entities/EventMember';
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

@Entity('event_member_notes')
class EventMemberNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  note_id: string;

  @ManyToOne(() => Note, note => note.eventMemberNotes, { eager: true })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @Column('uuid')
  member_id: string;

  @ManyToOne(() => EventMember, member => member.notes)
  @JoinColumn({ name: 'member_id' })
  eventMember: EventMember;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventMemberNote;
