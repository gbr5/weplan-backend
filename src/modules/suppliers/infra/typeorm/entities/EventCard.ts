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

import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import Event from '@modules/events/infra/typeorm/entities/Event';

@Entity('event_cards')
class EventCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  card_unique_name: string;

  @OneToOne(() => StageCard, card => card.unique_name)
  @JoinColumn({ name: 'card_unique_name' })
  stageCard: StageCard;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, { eager: true })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventCard;
