import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';

import Event from '@modules/events/infra/typeorm/entities/Event';
import User from '@modules/users/infra/typeorm/entities/User';
import EventUserSupplierNote from './EventUserSupplierNote';

@Entity('event_notes')
class EventNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_id: string;

  @OneToMany(() => Event, event => event.eventNotes)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('uuid')
  user_id: string;

  @OneToMany(() => User, user => user.userEventNotes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  access: string;

  @Column()
  note: string;

  @Column()
  color: string;

  @Column('boolean')
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => EventUserSupplierNote,
    eventSupplier => eventSupplier.eventNote,
  )
  eventUserSupplierNotes: EventUserSupplierNote[];
}

export default EventNote;
