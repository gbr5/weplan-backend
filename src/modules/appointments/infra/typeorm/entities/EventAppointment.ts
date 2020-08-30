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

  @Column()
  appointment_id: string;

  @ManyToOne(() => Appointment, appointment => appointment.id)
  @JoinColumn({ name: 'appointment_id' })
  Appointment: Appointment;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.id)
  @JoinColumn({ name: 'event_id' })
  Event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventAppointment;
