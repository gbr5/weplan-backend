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
import AppointmentType from './AppointmentType';
import WeplanAppointmentGuest from './WeplanAppointmentGuest';
import NonUserAppointmentGuest from './NonUserAppointmentGuest';
import EventAppointment from './EventAppointment';
import StageCardAppointment from './StageCardAppointment';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column('timestamp')
  date: Date;

  @Column('numeric')
  duration_minutes: number;

  @Column()
  address: string;

  @Column()
  appointment_type: string;

  @ManyToOne(() => AppointmentType, appointmentType => appointmentType.name)
  @JoinColumn({ name: 'appointment_type' })
  Type: AppointmentType;

  @Column('boolean')
  weplanGuest: boolean;

  @Column()
  host_id: string;

  @ManyToOne(() => User, host => host.id)
  @JoinColumn({ name: 'host_id' })
  Host: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => WeplanAppointmentGuest,
    weplanGuest => weplanGuest.appointment_id,
  )
  WeplanGuest: WeplanAppointmentGuest;

  @OneToMany(
    () => NonUserAppointmentGuest,
    nonUserappointmentGuest => nonUserappointmentGuest.appointment_id,
  )
  NUGuest: NonUserAppointmentGuest;

  @OneToMany(
    () => EventAppointment,
    appointmentEvent => appointmentEvent.appointment_id,
  )
  Event: EventAppointment;

  @OneToMany(
    () => StageCardAppointment,
    appointmentStageCard => appointmentStageCard.appointment_id,
  )
  StageCard: StageCardAppointment;
}

export default Appointment;
