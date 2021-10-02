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

import User from '@modules/users/infra/typeorm/entities/User';
import EventOwnerTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventOwnerTransactionAgreement';
import EventOwnerNote from '@modules/notes/infra/typeorm/entities/EventOwnerNote';
import Event from './Event';

@Entity('event_owners')
class EventOwner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, owner => owner.eventOwners, { eager: true })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('uuid')
  owner_id: string;

  @ManyToOne(() => User, eventOwner => eventOwner.userEventOwners, {
    eager: true,
  })
  @JoinColumn({ name: 'owner_id' })
  userEventOwner: User;

  @Column('numeric')
  number_of_guests: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => EventOwnerTransactionAgreement,
    transactionAgreement => transactionAgreement.eventOwner,
    { eager: true },
  )
  transactionAgreements: EventOwnerTransactionAgreement[];

  @OneToMany(
    () => EventOwnerNote,
    transactionAgreement => transactionAgreement.eventOwner,
    { eager: true },
  )
  notes: EventOwnerNote[];
}

export default EventOwner;
