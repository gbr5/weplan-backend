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

import UserForm from './UserForm';

@Entity('form_fields')
class FormField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  form_id: string;

  @ManyToOne(() => UserForm, form => form.fields)
  @JoinColumn({ name: 'form_id' })
  form: UserForm;

  @Column('numeric')
  position: number;

  @Column('boolean')
  isRequired: boolean;

  @Column()
  title: string;

  @Column()
  placeholder: string;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @OneToMany(() => FormPost, post => post.contactPage, {
  //   eager: true,
  // })
  // posts: FormPost[];
}

export default FormField;
