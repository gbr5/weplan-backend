import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

import Event from '@modules/events/infra/typeorm/entities/Event';
import SupplierSubCategory from '@modules/suppliers/infra/typeorm/entities/SupplierSubCategory';
import TransactionAgreement from '@modules/finances/infra/typeorm/entities/TransactionAgreement';
import EventWeplanSupplier from './EventWeplanSupplier';

@Entity('event_suppliers')
class EventSupplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.id)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  supplier_sub_category: string;

  @ManyToOne(() => SupplierSubCategory, subCategory => subCategory.sub_category)
  @JoinColumn({ name: 'supplier_sub_category' })
  subCategory: SupplierSubCategory;

  @Column('boolean')
  isHired: boolean;

  @Column('boolean')
  weplanUser: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(
    () => EventWeplanSupplier,
    eventWeplanSupplier => eventWeplanSupplier.eventSupplier,
    { eager: true },
  )
  eventWeplanSupplier: EventWeplanSupplier;

  @OneToMany(
    () => TransactionAgreement,
    transactionAgreement => transactionAgreement.supplier,
  )
  transactionAgreement: TransactionAgreement[];
}

export default EventSupplier;
