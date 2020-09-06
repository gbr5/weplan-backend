import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Event from '@modules/events/infra/typeorm/entities/Event';
import SupplierSubCategory from '@modules/suppliers/infra/typeorm/entities/SupplierSubCategory';

@Entity('selected_suppliers')
class EventSupplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  supplier_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'supplier_id' })
  Supplier: User;

  @Column()
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventSupplier;
