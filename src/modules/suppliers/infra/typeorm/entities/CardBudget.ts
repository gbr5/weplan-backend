import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import CompanyContact from './CompanyContact';
import CardBudgetInstallment from './CardBudgetInstallment';

@Entity('card_budgets')
class CardBudget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => CompanyContact, customer => customer, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: CompanyContact;

  @Column('uuid')
  sales_person_id: string;

  @ManyToOne(() => User, salesPerson => salesPerson.notes, { eager: true })
  @JoinColumn({ name: 'sales_person_id' })
  sales_person: User;

  @Column('uuid')
  company_id: string;

  @ManyToOne(() => User, user => user.notes, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: User;

  @Column()
  card_unique_name: string;

  @Column()
  description: string;

  @Column('numeric')
  value: number;

  @Column('date')
  validity_date: Date;

  @Column('numeric')
  number_of_installments: number;

  @Column('boolean')
  isValid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => CardBudgetInstallment,
    budgetInstallment => budgetInstallment.cardBudget,
    { eager: true },
  )
  installments: CardBudgetInstallment[];
}

export default CardBudget;
