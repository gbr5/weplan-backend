import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Guest from './Guest';
import Event from './Event';

@Entity('weplan_guests')
class WeplanGuest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guest_id: string;

  @OneToOne(() => Guest, guest => guest.weplanGuest)
  @JoinColumn({ name: 'guest_id' })
  guest: Guest;

  @Column()
  user_id: string;

  @ManyToOne(() => User, userGuest => userGuest.weplanUserGuests, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  weplanUserGuest: User;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, { eager: true })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default WeplanGuest;
