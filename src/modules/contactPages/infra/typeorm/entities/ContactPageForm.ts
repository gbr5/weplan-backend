import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import UserContactPage from './UserContactPage';

@Entity('contact_page_forms')
class ContactPageForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  contact_page_id: string;

  @ManyToOne(() => UserContactPage, contactPage => contactPage.forms)
  @JoinColumn({ name: 'contact_page_id' })
  contactPage: UserContactPage;

  @Column('uuid')
  form_id: string;

  @ManyToOne(() => UserForm, form => form.contactPages, {
    eager: true,
  })
  @JoinColumn({ name: 'form_id' })
  form: UserForm;

  @Column('boolean')
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ContactPageForm;
