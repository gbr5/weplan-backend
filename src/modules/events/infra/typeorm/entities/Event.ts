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

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @Column()
  event_type: string;

  @ManyToOne(() => EventType, event_type => event_type.name)
  @JoinColumn({ name: 'event_type' })
  eventType: EventType;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => SelectedSupplier,
    selected_supplier => selected_supplier.event_name,
  )
  selected_suppliers: string;

  @OneToMany(() => UserCheckList, user_check_list => user_check_list.event_name)
  user_check_lists: string;

  @OneToMany(() => EventPlanner, event_planner => event_planner.event_name)
  event_planners: string;

  @OneToMany(() => EventOwner, event_owner => event_owner.event_name)
  event_owners: string;

  @OneToMany(() => EventMember, event_member => event_member.event_name)
  event_members: string;

  @OneToOne(() => EventInfo, event_info => event_info.event_name)
  event_infos: string;
}

export default Event;
