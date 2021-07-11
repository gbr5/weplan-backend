import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Note from '@modules/notes/infra/typeorm/entities/Note';
import EventTask from './EventTask';

@Entity('event_task_notes')
class EventTaskNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  note_id: string;

  @ManyToOne(() => Note, note => note.eventTaskNote, { eager: true })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @Column()
  task_id: string;

  @ManyToOne(() => EventTask, task => task.notes)
  @JoinColumn({ name: 'task_id' })
  task: EventTask;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventTaskNote;
