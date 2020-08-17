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

import Funnel from './Funnel';
import StageCard from './StageCard';

@Entity('funnel_stages')
class FunnelStage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  funnel_id: string;

  @ManyToOne(() => Funnel, { eager: true })
  @JoinColumn({ name: 'funnel_id' })
  Funnel: Funnel;

  @Column()
  funnel_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => StageCard, card => card.stage_id)
  SupplierCard: StageCard;
}

export default FunnelStage;
