import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import SupplierSubCategory from './SupplierSubCategory';

@Entity('supplier_categories')
class SupplierCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => SupplierSubCategory,
    user_supplier_category => user_supplier_category.category_name,
  )
  user_supplier_categories: string;
}

export default SupplierCategories;
