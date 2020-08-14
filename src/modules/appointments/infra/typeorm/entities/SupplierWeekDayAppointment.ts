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
  provider: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SupplierWeekDayAppointment;
