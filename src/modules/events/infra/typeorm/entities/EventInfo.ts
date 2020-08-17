import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';

import Event from '@modules/events/infra/typeorm/entities/Event';

@Entity('event_infos')
class EventInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_name: string;

  @OneToOne(() => Event, event => event.trimmed_name)
  @JoinColumn({ name: 'event_name' })
  Event: Event;

  @Column('numeric')
  number_of_guests: number;

  @Column('numeric')
  start_hour: number;

  @Column('numeric')
  duration: number;

  @Column('numeric')
  budget: number;

  @Column()
  description: string;

  @Column()
  country: string;

  @Column()
  local_state: string;

  @Column()
  city: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventInfo;
