import GuestContactInfo from '@modules/events/infra/typeorm/entities/GuestContactInfo';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import UserContactInfo from './UserContactInfo';

@Entity('contact_types')
class ContactType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserContactInfo, contact_info => contact_info.user_id)
  ContactInfo: UserContactInfo;

  @OneToMany(() => GuestContactInfo, guest => guest.contactType)
  guestContactTypes: GuestContactInfo[];
}

export default ContactType;
