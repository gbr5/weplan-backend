import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
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
import EventSupplierTransaction from './EventSupplierTransaction';

@Entity('event_supplier_transaction_agreements')
class EventSupplierTransactionAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  supplier_id: string;

  @ManyToOne(
    () => EventSupplier,
    eventSupplier => eventSupplier.transactionAgreements,
  )
  @JoinColumn({ name: 'supplier_id' })
  eventSupplier: EventSupplier;

  @Column('numeric')
  amount: number;

  @Column('numeric')
  number_of_installments: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => EventSupplierTransaction,
    agreement => agreement.transaction,
    // { eager: true },
  )
  transactions: EventSupplierTransaction[];
}

export default EventSupplierTransactionAgreement;
