import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import CheckListTaskNote from './CheckListTaskNote';

@Entity('notes')
class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  note: string;

  @Column('uuid')
  author_id: string;

  @Column('boolean')
  isNew: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => CheckListTaskNote, note => note.note)
  checkListTaskNote: CheckListTaskNote;
}

export default Note;
