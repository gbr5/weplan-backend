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

  @ManyToOne(() => Appointment, appointment => appointment.id)
  @JoinColumn({ name: 'appointment_id' })
  Appointment: Appointment;

  @Column()
  supplier_id: string;

  @ManyToOne(() => User, Host => Host.id)
  @JoinColumn({ name: 'supplier_id' })
  Host: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default NonUserAppointmentGuest;