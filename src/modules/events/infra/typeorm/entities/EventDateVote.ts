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
import EventDate from './EventDate';

@Entity('event_date_votes')
class EventDateVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_date_id: string;

  @ManyToOne(() => EventDate, event => event.eventDateVotes)
  @JoinColumn({ name: 'event_date_id' })
  eventDate: EventDate;

  @Column()
  user_id: string;

  @ManyToOne(() => User, event => event.userEventDateVotes, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('boolean')
  isOwner: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventDateVote;
