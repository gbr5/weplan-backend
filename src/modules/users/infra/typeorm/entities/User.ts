import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';
import Event from '@modules/events/infra/typeorm/entities/Event';
import EventTypeSupplier from '@modules/events/infra/typeorm/entities/EventTypeSupplier';
import SelectedSupplier from '@modules/events/infra/typeorm/entities/SelectedSupplier';

import EventPlanner from '@modules/events/infra/typeorm/entities/EventPlanner';
import Funnel from '@modules/suppliers/infra/typeorm/entities/Funnel';
import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import SupplierAppointmentDaySchedule from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDaySchedule';
import SupplierAppointmentDayInterval from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayInterval';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import WeplanAppointmentGuest from '@modules/appointments/infra/typeorm/entities/WeplanAppointmentGuest';
import WeplanGuest from '@modules/events/infra/typeorm/entities/WeplanGuest';
import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
import EventMember from '@modules/events/infra/typeorm/entities/EventMember';
import FriendGroup from '@modules/users/infra/typeorm/entities/FriendGroup';
import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';
import CompanyInfo from './CompanyInfo';
import PersonInfo from './PersonInfo';
import UserToken from './UserToken';
import UserBirthdate from './UserBirthdate';
import UserContactInfo from './UserContactInfo';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  trimmed_name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('boolean')
  isCompany: boolean;

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

  @OneToOne(() => CompanyInfo, company_info => company_info.user_id)
  CompanyInfo: CompanyInfo;

  @OneToOne(() => PersonInfo, person_info => person_info.user_id)
  PersonInfo: PersonInfo;

  @OneToOne(() => UserBirthdate, user_birthdate => user_birthdate.user_id)
  UserBirthdate: UserBirthdate;

  @OneToMany(() => UserToken, user_token => user_token.token)
  UserToken: UserToken;

  @OneToOne(() => Event, event => event.user_id)
  Event: Event;

  @OneToMany(
    () => SelectedSupplier,
    selected_supplier => selected_supplier.supplier_id,
  )
  SelectedSupplier: SelectedSupplier;

  @OneToMany(() => EventOwner, owner => owner.owner_id)
  EventOwner: EventOwner;

  @OneToMany(() => EventMember, member => member.member_id)
  EventMember: EventMember;

  @OneToMany(
    () => EventTypeSupplier,
    event_type_supplier => event_type_supplier.user_id,
  )
  EventTypeSupplier: EventTypeSupplier;

  @OneToMany(() => EventPlanner, event_planner => event_planner.planner_id)
  EventPlanner: EventPlanner;

  @OneToMany(() => UserContactInfo, contact_info => contact_info.user_id)
  Contacts: UserContactInfo;

  @OneToMany(() => Funnel, funnel => funnel.supplier_id)
  Funnel: Funnel;

  @OneToOne(() => StageCard, card => card.card_owner)
  EventCard: StageCard;

  @OneToMany(
    () => SupplierAppointmentDaySchedule,
    appointmentDaySchedule => appointmentDaySchedule.supplier_id,
  )
  SupplierAppointmentDaySchedule: SupplierAppointmentDaySchedule;

  @OneToMany(
    () => SupplierAppointmentDayInterval,
    appointmentDayInterval => appointmentDayInterval.supplier_id,
  )
  SupplierAppointmentDayInterval: SupplierAppointmentDayInterval;

  @OneToMany(() => Appointment, appointment => appointment.host_id)
  Appointment: Appointment;

  @OneToMany(() => WeplanAppointmentGuest, weplanGuest => weplanGuest.guest_id)
  Guest: WeplanAppointmentGuest;

  @OneToMany(() => WeplanAppointmentGuest, weplanGuest => weplanGuest.host_id)
  Host: WeplanAppointmentGuest;

  @OneToMany(() => WeplanGuest, guest => guest.user_id)
  WeplanGuest: WeplanGuest;

  @OneToMany(() => FriendGroup, owner => owner.user_id)
  OwnerFriendGroup: FriendGroup;

  @OneToMany(() => UserFriend, friend => friend.friend_id)
  UserFriend: UserFriend;

  @OneToMany(() => UserFriend, user => user.user_id)
  FriendUser: UserFriend;
}

export default User;
