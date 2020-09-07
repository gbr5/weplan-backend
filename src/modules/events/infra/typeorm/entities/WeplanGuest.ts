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

  @OneToOne(() => Guest, { eager: true })
  @JoinColumn({ name: 'guest_id' })
  Guest: Guest;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  UserGuest: User;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, { eager: true })
  @JoinColumn({ name: 'event_id' })
  Event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default WeplanGuest;
