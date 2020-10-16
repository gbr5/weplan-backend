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
    supplierCategory => supplierCategory.category,
  )
  @JoinColumn({ name: 'category_name' })
  Category: SupplierCategory;

  @Column()
  sub_category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => UserSupplierCategory,
    user_supplier_category => user_supplier_category.sub_category_name,
  )
  Supplier: UserSupplierCategory;

  @OneToMany(
    () => SupplierProduct,
    supplierProduct => supplierProduct.sub_category_id,
  )
  supplierProduct: SupplierProduct;
}

export default SupplierSubCategories;
