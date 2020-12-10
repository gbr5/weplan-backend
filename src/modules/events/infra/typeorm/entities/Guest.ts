import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Event from './Event';
import WeplanGuest from './WeplanGuest';
import UserEventGuestNote from './UserEventGuestNote';

@Entity('guests')
class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  description: string;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.eventGuests)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('uuid')
  host_id: string;

  @ManyToOne(() => User, host => host.hostGuests, { eager: true })
  @JoinColumn({ name: 'host_id' })
  host: User;

  @Column('boolean')
  confirmed: boolean;

  @Column('boolean')
  weplanUser: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => WeplanGuest, guest => guest.guest)
  weplanGuest: WeplanGuest;

  @OneToMany(() => UserEventGuestNote, guest => guest.guestNote)
  guestNotes: UserEventGuestNote[];
}

export default Guest;
