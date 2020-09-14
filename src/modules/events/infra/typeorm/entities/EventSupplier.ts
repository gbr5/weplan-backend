import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import Event from '@modules/events/infra/typeorm/entities/Event';
import SupplierSubCategory from '@modules/suppliers/infra/typeorm/entities/SupplierSubCategory';

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
  Event: Event;

  @Column()
  supplier_sub_category: string;

  @ManyToOne(() => SupplierSubCategory, subCategory => subCategory.sub_category)
  @JoinColumn({ name: 'supplier_sub_category' })
  SubCategory: SupplierSubCategory;

  @Column('boolean')
  isHired: boolean;

  @Column('boolean')
  weplanUser: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventSupplier;
