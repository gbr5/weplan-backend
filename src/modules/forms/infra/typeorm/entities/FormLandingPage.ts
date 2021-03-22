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

@Entity('form_landing_page')
class FormLandingPage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  form_id: string;

  @OneToOne(() => UserForm, form => form.landingPage)
  @JoinColumn({ name: 'form_id' })
  form: UserForm;

  @Column()
  url: string;

  @Column('boolean')
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FormLandingPage;
