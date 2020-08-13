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

import User from '@modules/users/infra/typeorm/entities/User';
import FunnelType from './FunnelType';
import FunnelStage from './FunnelStage';

@Entity('funnels')
class Funnel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  supplier_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'supplier_id' })
  supplierName: User;

  @Column()
  funnel_type: string;

  @ManyToOne(() => FunnelType, funnel_type => funnel_type.name)
  @JoinColumn({ name: 'funnel_type' })
  funnelType: FunnelType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => FunnelStage, stage => stage.funnel_id)
  stages: string;
}

export default Funnel;
