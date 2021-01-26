import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import UserImage from './UserImage';
import UserImageCategory from './UserImageCategory';

@Entity('category_images')
class CategoryImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  image_id: string;

  @ManyToOne(() => UserImage, image => image.imageCategories, { eager: true })
  @JoinColumn({ name: 'image_id' })
  image: UserImage;

  @Column('uuid')
  category_id: string;

  @ManyToOne(() => UserImageCategory, category => category.categoryImages)
  @JoinColumn({ name: 'category_id' })
  imageCategory: UserImageCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CategoryImage;
