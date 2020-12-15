import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Event from '@modules/events/infra/typeorm/entities/Event';

@Entity('event_owner_payments')
class EventOwnerPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_owner_id: string;

  @ManyToOne(() => EventOwner, eventOwner => eventOwner)
  @JoinColumn({ name: 'event_owner_id' })
  eventOwner: EventOwner;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('numeric')
  value: number;

  @Column('boolean')
  isPaid: boolean;

  @Column()
  description: string;

  @Column('date')
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventOwnerPayment;
