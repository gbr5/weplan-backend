import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Event from './Event';

@Entity('event_budget')
class EventBudget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_id: string;

  @OneToOne(() => Event, event => event.eventBudget)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('numeric')
  budget: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventBudget;
