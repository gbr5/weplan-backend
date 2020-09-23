import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';

@Entity('transaction_agreements')
class TransactionAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  supplier_id: string;

  @ManyToOne(() => EventSupplier, supplier => supplier.id)
  @JoinColumn({ name: 'supplier_id' })
  EventSupplier: EventSupplier;

  @Column('numeric')
  amount: number;

  @Column('numeric')
  number_of_installments: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TransactionAgreement;
