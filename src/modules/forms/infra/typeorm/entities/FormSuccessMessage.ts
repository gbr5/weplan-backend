import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';

import UserForm from './UserForm';

@Entity('form_success_message')
class FormSuccessMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  form_id: string;

  @OneToOne(() => UserForm, form => form.successMessage)
  @JoinColumn({ name: 'form_id' })
  form: UserForm;

  @Column()
  title: string;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FormSuccessMessage;
