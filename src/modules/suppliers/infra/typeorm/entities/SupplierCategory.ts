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
    user_supplier_category => user_supplier_category.supplierCategory,
  )
  subCategories: SupplierSubCategory[];
}

export default SupplierCategories;
