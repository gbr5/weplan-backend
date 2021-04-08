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
// import CompanyFunnelCardInfo from './CompanyFunnelCardInfo';
import Funnel from './Funnel';

@Entity('company_funnel_card_info_fields')
class CompanyFunnelCardInfoField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  company_id: string;

  @ManyToOne(() => User, company => company.company_funnel_card_info_fields)
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column('uuid')
  funnel_id: string;

  @ManyToOne(() => Funnel, funnel => funnel.card_info_fields)
  @JoinColumn({ name: 'funnel_id' })
  funnel: Funnel;

  @Column()
  name: string;

  @Column()
  field_type: string;

  @Column('boolean')
  isRequired: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @OneToMany(
  //   () => CompanyFunnelCardInfo,
  //   response => response.funnel_info_field,
  //   { eager: true },
  // )
  // field_responses: CompanyFunnelCardInfo[];
}

export default CompanyFunnelCardInfoField;
