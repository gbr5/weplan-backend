import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Event from './Event';

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

  @Column()
  event_id: string;

  @ManyToOne(() => Event, { eager: true })
  @JoinColumn({ name: 'event_id' })
  Event: Event;

  @Column()
  host_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'host_id' })
  Host: User;

  @Column('boolean')
  confirmed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Guest;
