import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import FormField from '@modules/forms/infra/typeorm/entities/FormField';
import ContactPageForm from '@modules/contactPages/infra/typeorm/entities/ContactPageForm';

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
  title: string;

  @Column()
  message: string;

  @Column('boolean')
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => FormField, post => post.form, {
    eager: true,
  })
  fields: FormField[];

  @OneToMany(() => ContactPageForm, post => post.form)
  contactPages: ContactPageForm[];
}

export default UserForm;