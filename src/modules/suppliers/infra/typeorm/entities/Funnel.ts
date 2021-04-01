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

@Entity('funnels')
class Funnel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  supplier_id: string;

  // Não utilizar o eager para nenhum dos lados, pois gera conflito nos event Members Owners e Guests no party
  @ManyToOne(() => User, user => user.supplierFunnels)
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
    funnel_card_info_field => funnel_card_info_field.funnel_id,
  )
  company_funnel_card_info_fields: CompanyFunnelCardInfoField[];
}

export default Funnel;
