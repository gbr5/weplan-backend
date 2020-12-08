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
import SupplierSubCategory from '@modules/suppliers/infra/typeorm/entities/SupplierSubCategory';
import EventTypes from '@modules/events/infra/typeorm/entities/EventType';

@Entity('supplier_products')
class SupplierProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  supplier: User;

  @Column('uuid')
  sub_category_id: string;

  @ManyToOne(
    () => SupplierSubCategory,
    subCategory => subCategory.supplierProducts,
    { eager: true },
  )
  @JoinColumn({ name: 'sub_category_id' })
  supplierProductSubCategory: SupplierSubCategory;

  @Column('uuid')
  event_type_id: string;

  @ManyToOne(() => EventTypes, eventType => eventType.supplierProducts, {
    eager: true,
  })
  @JoinColumn({ name: 'event_type_id' })
  eventType: EventTypes;

  @Column('numeric')
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SupplierProduct;
