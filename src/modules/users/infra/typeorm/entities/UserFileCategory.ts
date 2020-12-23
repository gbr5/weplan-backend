import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import CategoryFile from './CategoryFile';

@Entity('user_file_categories')
class UserFileCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.fileCategories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => CategoryFile, categoryFile => categoryFile.fileCategory, {
    eager: true,
  })
  categoryFiles: CategoryFile[];
}

export default UserFileCategory;
