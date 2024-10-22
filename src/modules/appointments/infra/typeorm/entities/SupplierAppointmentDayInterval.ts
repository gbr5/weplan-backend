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
import SupplierWeekDayAppointment from './SupplierWeekDayAppointment';

@Entity('supplier_appointment_day_intervals')
class SupplierAppointmentDayInterval {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  start_hour: number;

  @Column('numeric')
  start_minutes: number;

  @Column('numeric')
  duration_minutes: number;

  @Column('uuid')
  supplier_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'supplier_id' })
  Supplier: User;

  @Column('uuid')
  week_day_id: string;

  @ManyToOne(
    () => SupplierWeekDayAppointment,
    supplierWeekDayAppointment => supplierWeekDayAppointment.id,
  )
  @JoinColumn({ name: 'week_day_id' })
  WeekDay: SupplierWeekDayAppointment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SupplierAppointmentDayInterval;
