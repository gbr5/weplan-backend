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

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'supplier_id' })
  supplier: User;

  @Column('uuid')
  week_day_id: string;

  @ManyToOne(() => SupplierWeekDayAppointment, { eager: true })
  @JoinColumn({ name: 'week_day_id' })
  weekDayInterval: SupplierWeekDayAppointment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SupplierAppointmentDayInterval;
