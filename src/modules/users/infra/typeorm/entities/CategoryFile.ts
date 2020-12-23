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
import UserFileCategory from './UserFileCategory';

@Entity('category_files')
class CategoryFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  file_id: string;

  @ManyToOne(() => UserFile, file => file.fileCategories, { eager: true })
  @JoinColumn({ name: 'file_id' })
  file: UserFile;

  @Column('uuid')
  category_id: string;

  @ManyToOne(() => UserFileCategory, category => category.categoryFiles)
  @JoinColumn({ name: 'category_id' })
  fileCategory: UserFileCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CategoryFile;
