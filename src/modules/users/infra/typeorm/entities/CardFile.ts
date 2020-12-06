import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import UserFile from './UserFile';

@Entity('card_files')
class CardFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  file_id: string;

  @ManyToOne(() => UserFile, file => file.cardFiles, { eager: true })
  @JoinColumn({ name: 'file_id' })
  file: UserFile;

  @Column()
  card_unique_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CardFile;
