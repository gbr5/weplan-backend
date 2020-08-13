import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import FunnelStage from './FunnelStage';

@Entity('stage_cards')
class StageCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  stage_id: string;

  @ManyToOne(() => FunnelStage, { eager: true })
  @JoinColumn({ name: 'stage_id' })
  funnelStage: FunnelStage;

  @Column()
  card_owner: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'card_owner' })
  cardOwner: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StageCard;
