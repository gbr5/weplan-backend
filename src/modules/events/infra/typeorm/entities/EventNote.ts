import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import Event from '@modules/events/infra/typeorm/entities/Event';
import User from '@modules/users/infra/typeorm/entities/User';
import EventUserSupplierNote from './EventUserSupplierNote';
import UserEventGuestNote from './UserEventGuestNote';
import UserEventOwnerNote from './UserEventOwnerNote';
import UserEventMemberNote from './UserEventMemberNote';
import UserEventTaskNote from './UserEventTaskNote';
import UserEventTransactionNote from './UserEventTransactionNote';
import UserEventTransactionAgreementNote from './UserEventTransactionAgreementNote';
import EventNoteAccess from './EventNoteAccess';

@Entity('event_notes')
class EventNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.eventNotes)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.userEventNotes, { eager: true })
  @JoinColumn({ name: 'user_id' })
  userEventNote: User;

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
    eventSupplier => eventSupplier.eventUserSupplierNote,
  )
  eventUserSupplierNotes: EventUserSupplierNote[];

  @OneToMany(() => UserEventGuestNote, eventGuest => eventGuest.eventGuestNote)
  eventGuestNotes: UserEventGuestNote[];

  @OneToMany(() => UserEventOwnerNote, eventOwner => eventOwner.eventOwnerNote)
  eventOwnerNotes: UserEventOwnerNote[];

  @OneToMany(
    () => UserEventMemberNote,
    eventMember => eventMember.eventMemberNote,
  )
  eventMemberNotes: UserEventMemberNote[];

  @OneToMany(() => UserEventTaskNote, eventTask => eventTask.eventTaskNote)
  eventTaskNotes: UserEventTaskNote[];

  @OneToMany(
    () => UserEventTransactionNote,
    eventTransaction => eventTransaction.eventTransactionNote,
  )
  eventTransactionNotes: UserEventTransactionNote[];

  @OneToMany(
    () => UserEventTransactionAgreementNote,
    eventTransactionAgreement =>
      eventTransactionAgreement.eventTransactionAgreementNote,
  )
  eventTransactionAgreementNotes: UserEventTransactionAgreementNote[];

  @OneToMany(
    () => EventNoteAccess,
    eventUserAccess => eventUserAccess.eventUserAccessNote,
  )
  eventUserAccessNotes: EventNoteAccess[];
}

export default EventNote;
