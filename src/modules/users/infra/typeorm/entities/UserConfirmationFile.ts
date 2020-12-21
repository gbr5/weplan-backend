import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import UserConfirmation from './UserConfirmation';
import UserFile from './UserFile';

@Entity('user_confirmation_files')
class UserConfirmationFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  file_id: string;

  @ManyToOne(() => UserFile, file => file.userConfirmationFiles, {
    eager: true,
  })
  @JoinColumn({ name: 'file_id' })
  file: UserFile;

  @Column('uuid')
  user_confirmation_id: string;

  @ManyToOne(
    () => UserConfirmation,
    userConfirmation => userConfirmation.userConfirmationFiles,
  )
  @JoinColumn({ name: 'user_confirmation_id' })
  userConfirmation: UserConfirmation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserConfirmationFile;
