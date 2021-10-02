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
import EventMemberTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventMemberTransactionAgreement';
import EventMemberNote from '@modules/notes/infra/typeorm/entities/EventMemberNote';
import Event from './Event';

@Entity('event_members')
class EventMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, eventMember => eventMember.eventMembers, {
    eager: true,
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('uuid')
  member_id: string;

  @ManyToOne(() => User, userMember => userMember.userEventMembers, {
    eager: true,
  })
  @JoinColumn({ name: 'member_id' })
  userEventMember: User;

  @Column('numeric')
  number_of_guests: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => EventMemberTransactionAgreement,
    transactionAgreement => transactionAgreement.eventMember,
    { eager: true },
  )
  transactionAgreements: EventMemberTransactionAgreement[];

  @OneToMany(() => EventMemberNote, note => note.eventMember, { eager: true })
  notes: EventMemberNote[];
}

export default EventMember;
