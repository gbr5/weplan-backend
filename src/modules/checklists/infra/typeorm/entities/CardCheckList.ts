import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import StageCard from '@modules/suppliers/infra/typeorm/entities/StageCard';
import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';

@Entity('card_check_lists')
class CardCheckList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  card_id: string;

  @ManyToOne(() => StageCard, card => card.id)
  @JoinColumn({ name: 'card_id' })
  card: StageCard;

  @Column('uuid')
  check_list_id: string;

  @ManyToOne(() => CheckList, check_list => check_list.cards, { eager: true })
  @JoinColumn({ name: 'check_list_id' })
  check_list: CheckList;

  @Column()
  card_unique_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CardCheckList;
