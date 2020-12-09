import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@Entity('weplan_appointment_guests')
class WeplanAppointmentGuest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  appointment_id: string;

  @ManyToOne(
    () => Appointment,
    appointment => appointment.weplanGuestAppointments,
  )
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @Column()
  guest_id: string;

  @ManyToOne(() => User, user => user.weplanAppointmentGuests)
  @JoinColumn({ name: 'guest_id' })
  guest: User;

  @Column()
  host_id: string;

  @ManyToOne(() => User, host => host.weplanAppointmentHosts)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default WeplanAppointmentGuest;
