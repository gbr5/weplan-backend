import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import StageCardAppointment from '@modules/appointments/infra/typeorm/entities/StageCardAppointment';
import FunnelStage from './FunnelStage';
import EventCard from './EventCard';
import CompanyFunnelCardInfo from './CompanyFunnelCardInfo';
import ComercialCardResult from './ComercialCardResult';

@Entity('stage_cards')
class StageCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  weplanEvent: boolean;

  @Column()
  name: string;

  @Column()
  unique_name: string;

  @Column('numeric')
  value: number;

  @Column('boolean')
  isActive: boolean;

  @Column()
  stage_id: string;

  @ManyToOne(() => FunnelStage, funnelStage => funnelStage.id)
  @JoinColumn({ name: 'stage_id' })
  stage: FunnelStage;

  @Column()
  card_owner: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'card_owner' })
  Owner: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => EventCard, card => card.card_unique_name)
  Event: EventCard;

  @OneToMany(() => StageCardAppointment, card => card.card_id)
  Appointment: StageCardAppointment[];

  @OneToOne(() => ComercialCardResult, result => result.card, {
    eager: true,
  })
  result: ComercialCardResult[];

  @OneToMany(
    () => CompanyFunnelCardInfo,
    funnel_card_info => funnel_card_info.card_unique_name,
  )
  funnel_card_infos: CompanyFunnelCardInfo[];
}

export default StageCard;
