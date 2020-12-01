import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@Entity('stage_card_appointments')
class StageCardAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  appointment_id: string;

  @ManyToOne(() => Appointment, appointment => appointment.eventAppointments)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @Column()
  card_id: string;

  @ManyToOne(() => StageCard, stageCard => stageCard.id)
  @JoinColumn({ name: 'card_id' })
  supplierCard: StageCard;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StageCardAppointment;
