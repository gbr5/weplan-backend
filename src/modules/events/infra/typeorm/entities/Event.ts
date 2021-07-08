import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import EventCard from '@modules/suppliers/infra/typeorm/entities/EventCard';
import EventAppointment from '@modules/appointments/infra/typeorm/entities/EventAppointment';
import EventType from './EventType';
import UserCheckList from './UserCheckList';
import EventPlanner from './EventPlanner';
import EventOwner from './EventOwner';
import EventMember from './EventMember';
import EventInfo from './EventInfo';
import WeplanGuest from './WeplanGuest';
import EventServiceOrder from './EventServiceOrder';
import EventNote from './EventNote';
import EventSupplier from './EventSupplier';
import Guest from './Guest';
import EventDate from './EventDate';
import EventFile from './EventFile';
import EventImage from './EventImage';
import EventInspirationImage from './EventInspirationImage';
import EventTask from './EventTask';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('boolean')
  isDateDefined: boolean;

  @Column('boolean')
  isPublished: boolean;

  @Column('boolean', { default: false })
  eventDatesVoting: boolean;

  @Column({ default: 'single' })
  date_voting_type: string;

  @Column()
  trimmed_name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  Host: User;

  @Column()
  event_type: string;

  @ManyToOne(() => EventType, event_type => event_type.events)
  @JoinColumn({ name: 'event_type' })
  eventType: EventType;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }

  @OneToMany(() => UserCheckList, user_check_list => user_check_list.event_id)
  CheckList: UserCheckList[];

  @OneToMany(() => EventPlanner, event_planner => event_planner.event_id)
  Planner: EventPlanner[];

  @OneToMany(() => EventOwner, event_owner => event_owner.event)
  eventOwners: EventOwner[];

  @OneToMany(() => EventMember, event_member => event_member.event)
  eventMembers: EventMember[];

  @OneToMany(() => WeplanGuest, guest => guest.event_id)
  WeplanGuest: WeplanGuest[];

  @OneToMany(() => Guest, guest => guest.event)
  eventGuests: Guest[];

  @OneToOne(() => EventInfo, event_info => event_info.event, { eager: true })
  eventInfo: EventInfo;

  @OneToOne(() => EventCard, card => card.event)
  supplierCard: EventCard;

  @OneToMany(() => EventSupplier, card => card.event)
  eventSuppliers: EventSupplier[];

  @OneToMany(() => EventAppointment, eventAppointment => eventAppointment.event)
  eventAppointments: EventAppointment[];

  @OneToMany(
    () => EventServiceOrder,
    eventServiceOrder => eventServiceOrder.event,
  )
  eventServiceOrders: EventServiceOrder[];

  @OneToMany(() => EventNote, note => note.event)
  eventNotes: EventNote[];

  @OneToMany(() => EventDate, eventDate => eventDate.event, { eager: true })
  eventDates: EventDate[];

  @OneToMany(() => EventTask, eventTask => eventTask.event, { eager: true })
  eventTasks: EventTask[];

  @OneToMany(() => EventFile, eventFile => eventFile.event, { eager: true })
  eventFiles: EventFile[];

  @OneToMany(() => EventImage, eventImage => eventImage.event, { eager: true })
  eventImages: EventImage[];

  @OneToMany(
    () => EventInspirationImage,
    eventInspirationImage => eventInspirationImage.event,
  )
  eventInspirationImages: EventInspirationImage[];
}

export default Event;
