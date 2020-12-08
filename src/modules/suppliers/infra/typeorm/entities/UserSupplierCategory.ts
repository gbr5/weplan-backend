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

  @ManyToOne(() => User, user => user.userBySupplierCategories, { eager: true })
  @JoinColumn({ name: 'user_id' })
  userBySupplierCategory: User;

  @Column()
  sub_category_name: string;

  @ManyToOne(
    () => SupplierSubCategory,
    supplierCategory => supplierCategory.userSupplierSubCategories,
  )
  @JoinColumn({ name: 'sub_category_name' })
  userSupplierSubCategory: SupplierSubCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserSupplierCategories;
