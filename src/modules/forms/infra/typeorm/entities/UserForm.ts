import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import FormField from '@modules/forms/infra/typeorm/entities/FormField';
import ContactPageForm from '@modules/contactPages/infra/typeorm/entities/ContactPageForm';
import FormSuccessMessage from './FormSuccessMessage';
import FormEmailNotification from './FormEmailNotification';
import FormStyles from './FormStyles';
import FormLandingPage from './FormLandingPage';

@Entity('user_forms')
class UserForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.contactPages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  external_name: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column('boolean')
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ContactPageForm, post => post.form)
  contactPages: ContactPageForm[];

  @OneToMany(() => FormField, post => post.form, {
    eager: true,
  })
  fields: FormField[];

  @OneToMany(
    () => FormEmailNotification,
    emailNotification => emailNotification.form,
    {
      eager: true,
    },
  )
  emailNotifications: FormEmailNotification[];

  @OneToOne(() => FormSuccessMessage, successMessage => successMessage.form, {
    eager: true,
  })
  successMessage: FormSuccessMessage;

  @OneToOne(() => FormStyles, styles => styles.form, {
    eager: true,
  })
  styles: FormStyles;

  @OneToOne(() => FormLandingPage, landingPage => landingPage.form, {
    eager: true,
  })
  landingPage: FormLandingPage;
}

export default UserForm;
