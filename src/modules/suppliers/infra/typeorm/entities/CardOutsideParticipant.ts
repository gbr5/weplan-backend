import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import CompanyContact from './CompanyContact';

@Entity('card_outside_participants')
class CardOutsideParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  company_contact_id: string;

  @ManyToOne(
    () => CompanyContact,
    outsideParticipant => outsideParticipant.cardOutsideParticipants,
    { eager: true },
  )
  @JoinColumn({ name: 'company_contact_id' })
  outsideParticipant: CompanyContact;

  @Column()
  card_unique_name: string;

  @Column()
  contact_card_unique_name: string;

  @Column()
  status: string;

  @Column('boolean')
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CardOutsideParticipant;
