import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('main_transactions')
class MainTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  value: number;

  @Column('date')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MainTransaction;
