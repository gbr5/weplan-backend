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

  @ManyToOne(() => Appointment, { eager: true })
  @JoinColumn({ name: 'appointment_id' })
  Appointment: Appointment;

  @Column()
  guest_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'guest_id' })
  Guest: User;

  @Column()
  host_id: string;

  @ManyToOne(() => User, Host => Host.id)
  @JoinColumn({ name: 'host_id' })
  Host: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default WeplanAppointmentGuest;
