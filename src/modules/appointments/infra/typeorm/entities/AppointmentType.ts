import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Appointment from './Appointment';

@Entity('appointment_types')
class AppointmentType {
  @PrimaryColumn()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Appointment, appointment => appointment.appointment_type)
  Appointment: Appointment;
}

export default AppointmentType;
