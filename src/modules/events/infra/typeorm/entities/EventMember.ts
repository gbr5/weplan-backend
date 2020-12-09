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
import Event from './Event';
import UserEventMemberNote from './UserEventMemberNote';

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

  @OneToMany(() => UserEventMemberNote, member => member.memberNote)
  memberNotes: UserEventMemberNote[];
}

export default EventMember;
