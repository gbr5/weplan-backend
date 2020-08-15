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
import SupplierAppointmentDaySchedule from './SupplierAppointmentDaySchedule';

@Entity('supplier_week_day_appointments')
class SupplierWeekDayAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  week_day: string;

  @Column()
  supplier_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'supplier_id' })
  supplier: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => SupplierAppointmentDaySchedule,
    appointmentDaySchedule => appointmentDaySchedule.week_day_id,
  )
  appointmentDaySchedule: SupplierAppointmentDaySchedule;
}

export default SupplierWeekDayAppointment;
