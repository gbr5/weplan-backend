import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
  OneToMany,
  // OneToMany,
} from 'typeorm';
import FormEmailNotificationRecipient from './FormEmailNotificationRecipient';

import UserForm from './UserForm';

@Entity('form_email_notifications')
class FormEmailNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  form_id: string;

  @ManyToOne(() => UserForm, form => form.emailNotifications)
  @JoinColumn({ name: 'form_id' })
  form: UserForm;

  @Column()
  notification_type: string;

  @Column()
  subject: string;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => FormEmailNotificationRecipient,
    emailNotificationRecipient => emailNotificationRecipient.emailNotification,
    {
      eager: true,
    },
  )
  recipients: FormEmailNotificationRecipient[];
}

export default FormEmailNotification;
