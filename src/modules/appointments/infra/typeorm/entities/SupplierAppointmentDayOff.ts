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

@Entity('supplier_appointment_days_off')
class SupplierAppointmentDayOff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day_off: Date;

  @Column()
  supplier_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'supplier_id' })
  Supplier: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SupplierAppointmentDayOff;
