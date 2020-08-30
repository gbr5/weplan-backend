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

@Entity('weplan_guests')
class WeplanGuest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guest_id: string;

  @OneToOne(() => Guest, guest => guest.id)
  @JoinColumn({ name: 'guest_id' })
  Guest: Guest;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default WeplanGuest;
