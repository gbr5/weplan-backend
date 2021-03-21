import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToOne,
  // OneToMany,
} from 'typeorm';

import UserForm from './UserForm';

@Entity('form_styles')
class FormStyles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  form_id: string;

  @OneToOne(() => UserForm, form => form.styles)
  @JoinColumn({ name: 'form_id' })
  form: UserForm;

  @Column()
  background_color: string;

  @Column()
  text_color: string;

  @Column()
  button_color: string;

  @Column()
  button_text_color: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FormStyles;
