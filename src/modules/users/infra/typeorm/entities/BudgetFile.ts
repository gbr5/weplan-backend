import CardBudget from '@modules/suppliers/infra/typeorm/entities/CardBudget';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import UserFile from './UserFile';

@Entity('budget_files')
class BudgetFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  file_id: string;

  @ManyToOne(() => UserFile, file => file.categoryFiles, { eager: true })
  @JoinColumn({ name: 'file_id' })
  file: UserFile;

  @Column('uuid')
  budget_id: string;

  @ManyToOne(() => CardBudget, category => category.fileBudgets)
  @JoinColumn({ name: 'budget_id' })
  fileBudget: CardBudget;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BudgetFile;
