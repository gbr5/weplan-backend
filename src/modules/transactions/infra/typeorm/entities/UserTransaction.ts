import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import MainTransaction from './MainTransaction';

@Entity('user_transactions')
class UserTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  main_transaction_id: string;

  @ManyToOne(() => MainTransaction)
  @JoinColumn({ name: 'main_transaction_id' })
  mainTransaction: MainTransaction;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  transaction_type: string;

  @Column('uuid')
  weplanUser: string;

  @Column()
  weplanUserType: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserTransaction;
