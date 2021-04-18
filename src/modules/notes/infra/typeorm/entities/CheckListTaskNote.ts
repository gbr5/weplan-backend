import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import Note from '@modules/notes/infra/typeorm/entities/Note';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('check_list_task_notes')
class CheckListTaskNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  task_id: string;

  @ManyToOne(() => CheckListTask, task => task.notes)
  @JoinColumn({ name: 'task_id' })
  task: CheckListTask;

  @Column('uuid')
  note_id: string;

  @OneToOne(() => Note, task => task.checkListTaskNote, {
    eager: true,
  })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CheckListTaskNote;
