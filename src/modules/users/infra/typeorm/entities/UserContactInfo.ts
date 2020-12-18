import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import ContactType from '@modules/users/infra/typeorm/entities/ContactType';

@Entity('user_contact_infos')
class UserContactInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contact_info: string;

  @Column()
  contact_type: string;

  @OneToOne(() => ContactType, contact_type => contact_type.name)
  @JoinColumn({ name: 'contact_type' })
  contact_types: ContactType;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.userContacts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserContactInfo;
