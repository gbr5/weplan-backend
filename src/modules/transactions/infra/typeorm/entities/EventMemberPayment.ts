import EventMember from '@modules/events/infra/typeorm/entities/EventMember';
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

@Entity('event_member_payments')
class EventMemberPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_member_id: string;

  @ManyToOne(() => EventMember, eventMember => eventMember)
  @JoinColumn({ name: 'event_member_id' })
  eventMember: EventMember;

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

export default EventMemberPayment;
