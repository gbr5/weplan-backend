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
import SupplierAppointmentDayInterval from './SupplierAppointmentDayInterval';

@Entity('supplier_week_day_appointments')
class SupplierWeekDayAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  week_day: string;

  @Column()
  supplier_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'supplier_id' })
  Supplier: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => SupplierAppointmentDaySchedule,
    appointmentDaySchedule => appointmentDaySchedule.week_day_id,
  )
  Schedule: SupplierAppointmentDaySchedule;

  @OneToMany(
    () => SupplierAppointmentDayInterval,
    appointmentDayInterval => appointmentDayInterval.week_day_id,
  )
  Interval: SupplierAppointmentDayInterval;
}

export default SupplierWeekDayAppointment;
