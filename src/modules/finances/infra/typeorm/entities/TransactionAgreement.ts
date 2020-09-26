import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import Transaction from '@modules/finances/infra/typeorm/entities/Transaction';

@Entity('transaction_agreements')
class TransactionAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  supplier_id: string;

  @ManyToOne(() => EventSupplier, supplier => supplier.transactionAgreement)
  @JoinColumn({ name: 'supplier_id' })
  supplier: EventSupplier;

  @Column('numeric')
  amount: number;

  @Column('numeric')
  number_of_installments: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Transaction, transaction => transaction.agreement, {
    cascade: true,
    eager: true,
  })
  transactions: Transaction[];
}

export default TransactionAgreement;
