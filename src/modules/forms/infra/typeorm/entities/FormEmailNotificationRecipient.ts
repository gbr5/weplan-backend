import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
  // OneToMany,
} from 'typeorm';

import FormEmailNotification from './FormEmailNotification';

@Entity('form_email_notification_recipients')
class FormEmailNotificationRecipient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  email_notification_id: string;

  @ManyToOne(() => FormEmailNotification, form => form.recipients)
  @JoinColumn({ name: 'email_notification_id' })
  emailNotification: FormEmailNotification;

  @Column()
  sending_type: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FormEmailNotificationRecipient;
