import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Funnel from './Funnel';

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
  funnels: Funnel;

  @Column()
  funnel_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FunnelStage;
