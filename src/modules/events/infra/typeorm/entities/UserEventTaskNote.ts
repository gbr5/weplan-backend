import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import EventNote from './EventNote';

@Entity('user_event_task_notes')
class UserEventTaskNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_note_id: string;

  @ManyToOne(() => EventNote, note => note.eventTaskNotes)
  @JoinColumn({ name: 'event_note_id' })
  eventTaskNote: EventNote;

  @Column('uuid')
  task_id: string;

  @ManyToOne(() => CheckListTask, task => task.taskNotes)
  @JoinColumn({ name: 'task_id' })
  taskNote: CheckListTask;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserEventTaskNote;
