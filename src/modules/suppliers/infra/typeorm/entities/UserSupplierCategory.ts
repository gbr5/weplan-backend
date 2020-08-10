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

@Entity('user_supplier_categories')
class UserSupplierCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @Column()
  sub_category_name: string;

  @ManyToOne(
    () => SupplierSubCategory,
    supplierCategory => supplierCategory.sub_category,
  )
  @JoinColumn({ name: 'sub_category_name' })
  subCategoryName: SupplierSubCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserSupplierCategories;
