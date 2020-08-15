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
class SupplierAppointmentDaySchedules {
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'supplier_id' })
  supplier: User;

  @Column('uuid')
  week_day_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'week_day_id' })
  weekDay: SupplierWeekDayAppointment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SupplierAppointmentDaySchedules;
