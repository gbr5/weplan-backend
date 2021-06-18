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

@Entity('guest_contacts')
class GuestContactInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  guest_id: string;

  @ManyToOne(() => Guest, guest => guest.guestContacts)
  @JoinColumn({ name: 'guest_id' })
  guestContact: Guest;

  @Column()
  contact_info: string;

  @Column()
  contact_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GuestContactInfo;
