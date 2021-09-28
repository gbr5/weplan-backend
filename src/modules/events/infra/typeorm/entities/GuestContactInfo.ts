import ContactType from '@modules/users/infra/typeorm/entities/ContactType';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Guest from './Guest';

@Entity('guest_contact_infos')
class GuestContactInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contact_info: string;

  @Column('uuid')
  contact_type_id: string;

  @ManyToOne(() => ContactType, contactType => contactType.guestContactTypes, {
    eager: true,
  })
  @JoinColumn({ name: 'contact_type_id' })
  contactType: ContactType;

  @Column('uuid')
  guest_id: string;

  @ManyToOne(() => Guest, guest => guest)
  @JoinColumn({ name: 'guest_id' })
  guestContactInfo: Guest;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GuestContactInfo;
