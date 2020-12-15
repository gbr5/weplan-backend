import Transaction from '@modules/finances/infra/typeorm/entities/Transaction';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import MainTransaction from './MainTransaction';

@Entity('event_supplier_main_transactions')
class EventSupplierMainTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  main_transaction_id: string;

  @ManyToOne(() => MainTransaction, mainTransaction => mainTransaction)
  @JoinColumn({ name: 'main_transaction_id' })
  mainTransaction: MainTransaction;

  @Column('uuid')
  agreement_transaction_id: string;

  @ManyToOne(() => Transaction, event => event)
  @JoinColumn({ name: 'agreement_transaction_id' })
  supplierAgreementTransaction: Transaction;

  @Column()
  transaction_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventSupplierMainTransaction;
