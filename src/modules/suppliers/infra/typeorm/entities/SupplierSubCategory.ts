import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import SupplierCategory from '@modules/suppliers/infra/typeorm/entities/SupplierCategory';
import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import UserSupplierCategory from './UserSupplierCategory';
import SupplierProduct from './SupplierProduct';

@Entity('supplier_sub_categories')
class SupplierSubCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_name: string;

  @ManyToOne(
    () => SupplierCategory,
    supplierCategory => supplierCategory.subCategories,
  )
  @JoinColumn({ name: 'category_name' })
  supplierCategory: SupplierCategory;

  @Column()
  sub_category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => UserSupplierCategory,
    user_supplier_category => user_supplier_category.userSupplierSubCategory,
  )
  userSupplierSubCategories: UserSupplierCategory[];

  @OneToMany(
    () => SupplierProduct,
    supplierProduct => supplierProduct.supplierProductSubCategory,
  )
  supplierProducts: SupplierProduct[];

  @OneToMany(
    () => EventSupplier,
    eventSupplier => eventSupplier.eventSupplierSubCategory,
  )
  eventSupplierSubCategories: EventSupplier[];
}

export default SupplierSubCategories;
