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

@Entity('non_user_appointment_guests')
class NonUserAppointmentGuest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  appointment_id: string;

  @ManyToOne(
    () => Appointment,
    appointment => appointment.nonUserAppointmentGuests,
  )
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @Column()
  supplier_id: string;

  @ManyToOne(() => User, host => host.nonUserAppointmentHosts)
  @JoinColumn({ name: 'supplier_id' })
  host: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default NonUserAppointmentGuest;
