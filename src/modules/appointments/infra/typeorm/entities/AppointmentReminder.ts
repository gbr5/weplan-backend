import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Appointment from './Appointment';

@Entity('appointment_reminders')
class AppointmentReminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  appointment_id: string;

  @ManyToOne(() => Appointment, appointment => appointment.appointmentReminders)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @Column('date')
  date: Date;

  @Column()
  reminder_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentReminder;
