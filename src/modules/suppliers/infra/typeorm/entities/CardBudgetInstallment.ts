import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import CardBudget from './CardBudget';

@Entity('card_budget_installments')
class CardBudgetInstallment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  card_budget_id: string;

  @ManyToOne(() => CardBudget, cardBudget => cardBudget.installments)
  @JoinColumn({ name: 'card_budget_id' })
  cardBudget: CardBudget;

  @Column('numeric')
  value: number;

  @Column('date')
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CardBudgetInstallment;
