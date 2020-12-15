import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import EventOwnerPayment from './EventOwnerPayment';
import MainTransaction from './MainTransaction';

@Entity('event_owner_payment_transactions')
class EventOwnerPaymentTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  main_transaction_id: string;

  @ManyToOne(() => MainTransaction, mainTransaction => mainTransaction)
  @JoinColumn({ name: 'main_transaction_id' })
  mainTransaction: MainTransaction;

  @Column('uuid')
  payment_id: string;

  @ManyToOne(() => EventOwnerPayment, eventOwnerPayment => eventOwnerPayment)
  @JoinColumn({ name: 'payment_id' })
  eventOwnerPayment: EventOwnerPayment;

  @Column()
  transaction_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventOwnerPaymentTransaction;
