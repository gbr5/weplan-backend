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
import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import CategoryFile from './CategoryFile';
import CardFile from './CardFile';
import ContactFile from './ContactFile';
import EmployeeFile from './EmployeeFile';
import UserConfirmationFile from './UserConfirmationFile';
import BudgetFile from './BudgetFile';

@Entity('user_files')
class UserFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.files)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  file_name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'file_url' })
  getAvatarUrl(): string | null {
    if (!this.url) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.url}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.url}`;
      default:
        return null;
    }
  }

  @OneToMany(() => CategoryFile, category => category.file)
  fileCategories: CategoryFile[];

  @OneToMany(() => CardFile, card => card.file)
  cardFiles: CardFile[];

  @OneToMany(() => ContactFile, contact => contact.file)
  contactFiles: ContactFile[];

  @OneToMany(() => EmployeeFile, employee => employee.file)
  employeeFiles: EmployeeFile[];

  @OneToMany(() => BudgetFile, budget => budget.file)
  budgetFiles: BudgetFile[];

  @OneToMany(
    () => UserConfirmationFile,
    userConfirmation => userConfirmation.file,
  )
  userConfirmationFiles: UserConfirmationFile[];
}

export default UserFile;
