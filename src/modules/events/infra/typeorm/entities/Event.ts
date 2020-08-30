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

import User from '@modules/users/infra/typeorm/entities/User';
import EventCard from '@modules/suppliers/infra/typeorm/entities/EventCard';
import EventAppointment from '@modules/appointments/infra/typeorm/entities/EventAppointment';
import EventType from './EventType';
import SelectedSupplier from './SelectedSupplier';
import UserCheckList from './UserCheckList';
import EventPlanner from './EventPlanner';
import EventOwner from './EventOwner';
import EventMember from './EventMember';
import EventInfo from './EventInfo';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  trimmed_name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  Host: User;

  @Column()
  event_type: string;

  @ManyToOne(() => EventType, event_type => event_type.name)
  @JoinColumn({ name: 'event_type' })
  Type: EventType;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => SelectedSupplier,
    selected_supplier => selected_supplier.event_id,
  )
  Supplier: SelectedSupplier;

  @OneToMany(() => UserCheckList, user_check_list => user_check_list.event_id)
  CheckList: UserCheckList;

  @OneToMany(() => EventPlanner, event_planner => event_planner.event_id)
  Planner: EventPlanner;

  @OneToMany(() => EventOwner, event_owner => event_owner.event_id)
  Owner: EventOwner;

  @OneToMany(() => EventMember, event_member => event_member.event_id)
  Member: EventMember;

  @OneToOne(() => EventInfo, event_info => event_info.event_id)
  Info: EventInfo;

  @OneToOne(() => EventCard, card => card.event_id)
  SupplierCard: EventCard;

  @OneToMany(
    () => EventAppointment,
    eventAppointment => eventAppointment.event_id,
  )
  Event: EventAppointment;
}

export default Event;
