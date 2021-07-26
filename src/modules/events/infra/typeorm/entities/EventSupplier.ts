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
import EventSupplierTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventSupplierTransactionAgreement';
import EventWeplanSupplier from './EventWeplanSupplier';
import EventUserSupplierNote from './EventUserSupplierNote';

@Entity('event_suppliers')
class EventSupplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.eventSuppliers)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  supplier_sub_category: string;

  @ManyToOne(
    () => SupplierSubCategory,
    subCategory => subCategory.eventSupplierSubCategories,
  )
  @JoinColumn({ name: 'supplier_sub_category' })
  eventSupplierSubCategory: SupplierSubCategory;

  @Column('boolean')
  isHired: boolean;

  @Column('boolean')
  isDischarged: boolean;

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
    () => EventSupplierTransactionAgreement,
    transactionAgreement => transactionAgreement.eventSupplier,
    { eager: true },
  )
  transactionAgreements: EventSupplierTransactionAgreement[];

  @OneToMany(
    () => EventUserSupplierNote,
    transactionAgreement => transactionAgreement.eventSupplierNote,
  )
  eventSupplierNotes: EventUserSupplierNote[];
}

export default EventSupplier;
