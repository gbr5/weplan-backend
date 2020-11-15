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
import CompanyFunnelCardInfoField from './CompanyFunnelCardInfoField';
import StageCard from './StageCard';

@Entity('company_funnel_card_infos')
class CompanyFunnelCardInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  funnel_card_field_id: string;

  @ManyToOne(() => CompanyFunnelCardInfoField, field => field.id)
  @JoinColumn({ name: 'funnel_card_field_id' })
  funnel_info_field: CompanyFunnelCardInfoField;

  @Column()
  card_unique_name: string;

  @ManyToOne(() => StageCard, card => card.unique_name)
  @JoinColumn({ name: 'card_unique_name' })
  card: StageCard;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, author => author.id)
  @JoinColumn({ name: 'user_id' })
  author: User;

  @Column()
  response: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CompanyFunnelCardInfo;
