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
import Task from './Task';

@Entity('task_notes')
class TaskNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  note_id: string;

  @ManyToOne(() => Note, note => note.taskNote, { eager: true })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @Column()
  task_id: string;

  @ManyToOne(() => Task, task => task.notes)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TaskNote;
