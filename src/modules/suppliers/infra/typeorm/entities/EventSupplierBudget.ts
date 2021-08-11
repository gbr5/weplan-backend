import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';

@Entity('event_supplier_budgets')
class EventSupplierBudget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  supplier_id: string;

  @ManyToOne(() => EventSupplier, event_supplier => event_supplier.budgets)
  @JoinColumn({ name: 'supplier_id' })
  eventSupplier: EventSupplier;

  @Column('numeric')
  amount: number;

  @Column()
  description: string;

  @Column('boolean')
  isActive: boolean;

  @Column('timestamp')
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventSupplierBudget;
