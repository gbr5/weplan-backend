import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import StageCard from './StageCard';

@Entity('comercial_card_results')
class ComercialCardResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  card_id: string;

  @OneToOne(() => StageCard, card => card.result)
  @JoinColumn({ name: 'card_id' })
  card: StageCard;

  @Column()
  note: string;

  @Column('numeric')
  contract_value: number;

  @Column('boolean')
  isSuccessful: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ComercialCardResult;
