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

import EventPlanner from '@modules/events/infra/typeorm/entities/EventPlanner';
import Funnel from '@modules/suppliers/infra/typeorm/entities/Funnel';
import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import SupplierAppointmentDaySchedule from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDaySchedule';
import SupplierAppointmentDayOff from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayOff';
import SupplierAppointmentDayInterval from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayInterval';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import WeplanAppointmentGuest from '@modules/appointments/infra/typeorm/entities/WeplanAppointmentGuest';
import WeplanGuest from '@modules/events/infra/typeorm/entities/WeplanGuest';
import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
import EventMember from '@modules/events/infra/typeorm/entities/EventMember';
import FriendGroup from '@modules/users/infra/typeorm/entities/FriendGroup';
import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';
import NonUserAppointmentGuest from '@modules/appointments/infra/typeorm/entities/NonUserAppointmentGuest';
import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import SupplierProduct from '@modules/suppliers/infra/typeorm/entities/SupplierProduct';
import WeplanContractOrder from '@modules/weplan/infra/typeorm/entities/WeplanContractOrder';
import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';
import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import CardNote from '@modules/suppliers/infra/typeorm/entities/CardNote';
import CompanyContact from '@modules/suppliers/infra/typeorm/entities/CompanyContact';
import CardParticipant from '@modules/suppliers/infra/typeorm/entities/CardParticipant';
import CompanyContactWeplanUser from '@modules/suppliers/infra/typeorm/entities/CompanyContactWeplanUser';
import CustomerServiceOrder from '@modules/suppliers/infra/typeorm/entities/CustomerServiceOrder';
import CompanyDefaultServiceOrderField from '@modules/suppliers/infra/typeorm/entities/CompanyDefaultServiceOrderField';
import UserSupplierCategories from '@modules/suppliers/infra/typeorm/entities/UserSupplierCategory';
import CompanyFunnelCardInfoField from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfoField';
import CompanyFunnelCardInfo from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfo';
import EventWeplanSupplier from '@modules/events/infra/typeorm/entities/EventWeplanSupplier';
import EventNote from '@modules/events/infra/typeorm/entities/EventNote';
import EventNoteAccess from '@modules/events/infra/typeorm/entities/EventNoteAccess';
import Guest from '@modules/events/infra/typeorm/entities/Guest';
import EventDateVote from '@modules/events/infra/typeorm/entities/EventDateVote';
import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import UserGoogleProfile from '@modules/googleProfiles/infra/typeorm/entities/UserGoogleProfile';
import CompanyInfo from './CompanyInfo';
import PersonInfo from './PersonInfo';
import UserToken from './UserToken';
import UserBirthdate from './UserBirthdate';
import UserContactInfo from './UserContactInfo';
import UserFileCategory from './UserFileCategory';
import UserFile from './UserFile';
import ImageParticipant from './ImageParticipant';
import UserImage from './UserImage';
import UserImageCategory from './UserImageCategory';
import InspirationImage from './InspirationImage';

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

  @Column('boolean')
  isActive: boolean;

  @Column('boolean')
  isDeleted: boolean;

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

  @OneToOne(() => CompanyInfo, company_info => company_info.company, {
    eager: true,
  })
  companyInfo: CompanyInfo;

  @OneToOne(() => PersonInfo, user => user.personUser, { eager: true })
  personInfo: PersonInfo;

  @OneToOne(() => UserGoogleProfile, googleProfile => googleProfile.user)
  googleProfile: UserGoogleProfile;

  @OneToOne(() => UserBirthdate, user_birthdate => user_birthdate.user_id)
  UserBirthdate: UserBirthdate;

  @OneToMany(() => UserToken, user_token => user_token.token)
  UserToken: UserToken;

  @OneToOne(() => Event, event => event.user_id)
  Event: Event;

  @OneToMany(
    () => EventWeplanSupplier,
    supplier => supplier.weplanEventSupplier,
  )
  weplanEventSuppliers: EventWeplanSupplier[];

  // Não utilizar o eager para nenhum dos lados, pois gera conflito nos event Members Owners e Guests no party
  @OneToMany(() => Funnel, funnel => funnel.Supplier)
  supplierFunnels: Funnel[];

  @OneToMany(() => UserFileCategory, fileCategory => fileCategory.user)
  fileCategories: UserFileCategory[];

  @OneToMany(() => UserFile, file => file.user)
  files: UserFile[];

  @OneToMany(() => EventOwner, owner => owner.userEventOwner)
  userEventOwners: EventOwner[];

  @OneToMany(() => EventMember, member => member.userEventMember)
  userEventMembers: EventMember[];

  @OneToMany(
    () => EventTypeSupplier,
    event_type_supplier => event_type_supplier.typeSupplier,
  )
  eventTypeSuppliers: EventTypeSupplier[];

  @OneToMany(() => EventPlanner, event_planner => event_planner.planner_id)
  EventPlanner: EventPlanner;

  @OneToMany(() => UserContactInfo, contact_info => contact_info.user, {
    eager: true,
  })
  userContacts: UserContactInfo[];

  @OneToOne(() => StageCard, card => card.card_owner)
  EventCard: StageCard;

  @OneToMany(
    () => UserSupplierCategories,
    supplier => supplier.userBySupplierCategory,
  )
  userBySupplierCategories: UserSupplierCategories[];

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

  @OneToMany(() => WeplanAppointmentGuest, weplanGuest => weplanGuest.guest)
  weplanAppointmentGuests: WeplanAppointmentGuest[];

  @OneToMany(() => Guest, guest => guest.host)
  hostGuests: Guest[];

  @OneToMany(() => WeplanAppointmentGuest, weplanGuest => weplanGuest.host)
  weplanAppointmentHosts: WeplanAppointmentGuest[];

  @OneToMany(() => WeplanGuest, guest => guest.weplanUserGuest)
  weplanUserGuests: WeplanGuest[];

  @OneToMany(() => FriendGroup, owner => owner.groupOwner)
  userFriendGroups: FriendGroup[];

  @OneToMany(() => UserFriend, friend => friend.friend)
  friends: UserFriend[];

  @OneToMany(() => UserFriend, user => user.user_id)
  user: UserFriend;

  @OneToMany(
    () => NonUserAppointmentGuest,
    nonUserappointmentGuest => nonUserappointmentGuest.host,
  )
  nonUserAppointmentHosts: NonUserAppointmentGuest[];

  @OneToMany(() => SupplierAppointmentDayOff, supplier => supplier.supplier_id)
  SupplierAppointmentDayOff: SupplierAppointmentDayOff;

  @OneToMany(() => CompanyEmployee, employee => employee.employeeUser)
  userAsEmployee: CompanyEmployee;

  @OneToMany(() => CompanyEmployee, company => company.company_id)
  company: CompanyEmployee;

  @OneToMany(() => CompanyMasterUser, user => user.masterUser)
  masterUsers: CompanyMasterUser[];

  @OneToMany(() => CompanyMasterUser, company => company.company)
  companyMasterUsers: CompanyMasterUser[];

  @OneToMany(() => SupplierProduct, supplierProduct => supplierProduct.user_id)
  supplierProduct: SupplierProduct[];

  @OneToMany(() => WeplanContractOrder, order => order.user_id)
  contractOrder: WeplanContractOrder[];

  @OneToMany(() => CheckList, check_list => check_list.user)
  check_lists: CheckList[];

  @OneToMany(() => CheckListTask, task => task.owner)
  tasks: CheckListTask[];

  @OneToMany(() => CardNote, note => note.note_author)
  notes: CardNote[];

  @OneToMany(() => CardParticipant, card => card.participant)
  card_participants: CardParticipant[];

  @OneToOne(() => CompanyContact, contact => contact.company)
  contacts_company: CompanyContact;

  @OneToMany(
    () => CompanyContactWeplanUser,
    contact => contact.companyContactWeplanUser,
  )
  companyContactWeplanUsers: CompanyContactWeplanUser[];

  @OneToMany(
    () => CustomerServiceOrder,
    customerServiceOrder => customerServiceOrder.company,
  )
  companyServiceOrders: CustomerServiceOrder[];

  @OneToMany(
    () => CompanyDefaultServiceOrderField,
    companyDefaultServiceOrder => companyDefaultServiceOrder.company,
  )
  companyDefaultServiceOrderFields: CompanyDefaultServiceOrderField[];

  @OneToMany(
    () => CompanyFunnelCardInfoField,
    funnel_card_field => funnel_card_field.company,
  )
  company_funnel_card_info_fields: CompanyFunnelCardInfoField[];

  @OneToMany(
    () => CompanyFunnelCardInfo,
    funnel_card_info => funnel_card_info.author,
  )
  funnel_card_infos: CompanyFunnelCardInfo[];

  @OneToMany(() => EventNote, eventNote => eventNote.userEventNote)
  userEventNotes: EventNote[];

  @OneToMany(() => EventNoteAccess, eventNote => eventNote.userAccessNote)
  userAccessNotes: EventNoteAccess[];

  @OneToMany(() => UserImage, userImage => userImage.user)
  userImages: UserImage[];

  @OneToMany(() => ImageParticipant, imageParticipant => imageParticipant.user)
  imageParticipants: ImageParticipant[];

  @OneToMany(() => EventDateVote, userEventDateVote => userEventDateVote.user)
  userEventDateVotes: EventDateVote[];

  @OneToMany(
    () => UserImageCategory,
    userUserImageCategory => userUserImageCategory.user,
  )
  imageCategories: UserImageCategory[];

  @OneToMany(
    () => InspirationImage,
    userInspirationImage => userInspirationImage.user,
  )
  userInspirationImages: InspirationImage[];

  @OneToMany(() => UserContactPage, userContactPage => userContactPage.user)
  contactPages: UserContactPage[];
}

export default User;
