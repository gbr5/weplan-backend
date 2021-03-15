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

import User from '@modules/users/infra/typeorm/entities/User';

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

  // @OneToMany(() => FormPost, post => post.contactPage, {
  //   eager: true,
  // })
  // posts: FormPost[];
}

export default UserForm;
