import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Event from '@modules/events/infra/typeorm/entities/Event';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@Entity('event_appointments')
class EventAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  appointment_id: string;

  @ManyToOne(() => Appointment, appointment => appointment.eventAppointments, {
    eager: true,
  })
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.eventAppointments)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventAppointment;
