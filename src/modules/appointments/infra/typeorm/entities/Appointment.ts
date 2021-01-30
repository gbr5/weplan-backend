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
import AppointmentFile from './AppointmentFile';

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

  @Column('boolean')
  guest: boolean;

  @Column()
  host_id: string;

  @ManyToOne(() => User, host => host.id)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => WeplanAppointmentGuest,
    weplanGuest => weplanGuest.appointment,
    { eager: true },
  )
  weplanGuestAppointments: WeplanAppointmentGuest[];

  @OneToMany(
    () => NonUserAppointmentGuest,
    nonUserappointmentGuest => nonUserappointmentGuest.appointment,
  )
  nonUserAppointmentGuests: NonUserAppointmentGuest[];

  @OneToMany(
    () => EventAppointment,
    appointmentEvent => appointmentEvent.appointment,
  )
  eventAppointments: EventAppointment[];

  @OneToMany(
    () => StageCardAppointment,
    appointmentStageCard => appointmentStageCard.appointment,
  )
  stageCardAppointments: StageCardAppointment[];

  @OneToMany(
    () => AppointmentFile,
    appointmentFiles => appointmentFiles.appointment,
    { eager: true },
  )
  appointmentFiles: AppointmentFile[];
}

export default Appointment;
