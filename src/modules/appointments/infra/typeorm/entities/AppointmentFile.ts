import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import UserFile from '@modules/users/infra/typeorm/entities/UserFile';
import Appointment from './Appointment';

@Entity('appointment_files')
class AppointmentFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  file_id: string;

  @ManyToOne(() => UserFile, file => file.appointmentFiles, { eager: true })
  @JoinColumn({ name: 'file_id' })
  file: UserFile;

  @Column()
  appointment_id: string;

  @ManyToOne(() => Appointment, appointment => appointment.appointmentFiles)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentFile;
