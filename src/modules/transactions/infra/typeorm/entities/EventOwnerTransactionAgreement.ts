import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
import EventOwnerMonthlyPaymentAgreement from '@modules/events/infra/typeorm/entities/EventOwnerMonthlyPaymentAgreement';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import EventOwnerTransaction from './EventOwnerTransaction';

@Entity('event_owner_transaction_agreements')
class EventOwnerTransactionAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner_id: string;

  @ManyToOne(() => EventOwner, eventOwner => eventOwner.transactionAgreements)
  @JoinColumn({ name: 'owner_id' })
  eventOwner: EventOwner;

  @Column('numeric')
  amount: number;

  @Column('numeric')
  number_of_installments: number;

  @Column('boolean')
  isCancelled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => EventOwnerTransaction, agreement => agreement.agreement, {
    eager: true,
  })
  transactions: EventOwnerTransaction[];

  @OneToOne(
    () => EventOwnerMonthlyPaymentAgreement,
    agreement => agreement.eventOwnerMonthlyAgreement,
  )
  ownerMonthlyPaymentAgreement: EventOwnerMonthlyPaymentAgreement[];
}

export default EventOwnerTransactionAgreement;
