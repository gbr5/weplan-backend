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
import CompanyFunnelCardInfoField from './CompanyFunnelCardInfoField';
// import CompanyFunnelCardInfoField from './CompanyFunnelCardInfoField';

@Entity('funnels')
class Funnel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  supplier_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'supplier_id' })
  Supplier: User;

  @Column()
  funnel_type: string;

  @ManyToOne(() => FunnelType, funnel_type => funnel_type.name)
  @JoinColumn({ name: 'funnel_type' })
  type: FunnelType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => FunnelStage, stage => stage.funnel, { eager: true })
  stages: FunnelStage[];

  @OneToMany(
    () => CompanyFunnelCardInfoField,
    funnel_card_info_field => funnel_card_info_field.funnel,
    { eager: true },
  )
  company_funnel_card_info_fields: CompanyFunnelCardInfoField[];
}

export default Funnel;
