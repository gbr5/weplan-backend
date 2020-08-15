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

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column('timestamp')
  date: Date;

  @Column()
  address: string;

  @Column()
  guess_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'guess_id' })
  appointmentGues: User;

  @Column()
  host_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'host_id' })
  appointmentHost: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
