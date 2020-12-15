import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import EventMemberPayment from './EventMemberPayment';
import MainTransaction from './MainTransaction';

@Entity('event_member_payment_transactions')
class EventMemberPaymentTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  main_transaction_id: string;

  @ManyToOne(() => MainTransaction, mainTransaction => mainTransaction)
  @JoinColumn({ name: 'main_transaction_id' })
  mainTransaction: MainTransaction;

  @Column('uuid')
  payment_id: string;

  @ManyToOne(() => EventMemberPayment, eventMemberPayment => eventMemberPayment)
  @JoinColumn({ name: 'payment_id' })
  eventMemberPayment: EventMemberPayment;

  @Column()
  transaction_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventMemberPaymentTransaction;
