import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Event from '@modules/events/infra/typeorm/entities/Event';
import MainTransaction from './MainTransaction';

@Entity('event_transactions')
class EventTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  main_transaction_id: string;

  @ManyToOne(() => MainTransaction)
  @JoinColumn({ name: 'main_transaction_id' })
  mainTransaction: MainTransaction;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;

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

export default EventTransaction;
