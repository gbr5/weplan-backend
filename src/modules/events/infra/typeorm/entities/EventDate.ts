import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Event from './Event';
import EventDateVote from './EventDateVote';

@Entity('event_dates')
class EventDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.eventDates)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => EventDateVote, eventDateVote => eventDateVote.eventDate, {
    eager: true,
  })
  eventDateVotes: EventDateVote[];
}

export default EventDate;
