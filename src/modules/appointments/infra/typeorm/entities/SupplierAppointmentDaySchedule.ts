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

@Entity('supplier_appointment_day_schedules')
class SupplierAppointmentDaySchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  start_hour: number;

  @Column('numeric')
  end_hour: number;

  @Column('numeric')
  duration_minutes: number;

  @Column('boolean')
  interval: boolean;

  @Column('uuid')
  supplier_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'supplier_id' })
  Supplier: User;

  @Column('uuid')
  week_day_id: string;

  @ManyToOne(() => SupplierWeekDayAppointment, { eager: true })
  @JoinColumn({ name: 'week_day_id' })
  WeekDay: SupplierWeekDayAppointment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SupplierAppointmentDaySchedule;
