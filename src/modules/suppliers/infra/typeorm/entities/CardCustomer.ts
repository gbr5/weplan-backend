import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import CompanyContact from './CompanyContact';

@Entity('card_customers')
class CardCurstomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => CompanyContact, card => card.customers, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: CompanyContact;

  @Column()
  card_unique_name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CardCurstomer;
