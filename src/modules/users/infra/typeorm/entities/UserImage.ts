import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import EventImage from '@modules/events/infra/typeorm/entities/EventImage';
import ImageParticipant from './ImageParticipant';
import CategoryImage from './CategoryImage';
import InspirationImage from './InspirationImage';

@Entity('user_images')
class UserImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column()
  image_name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getAvatarUrl(): string | null {
    if (!this.image_name) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/images/${this.image_name}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.image_name}`;
      default:
        return null;
    }
  }

  @OneToMany(() => EventImage, eventImage => eventImage.image)
  eventImages: EventImage[];

  @OneToMany(
    () => ImageParticipant,
    imageParticipant => imageParticipant.userImage,
  )
  imageParticipants: ImageParticipant[];

  @OneToMany(() => CategoryImage, categoryImage => categoryImage.image)
  imageCategories: CategoryImage[];

  @OneToMany(
    () => InspirationImage,
    inspirationImages => inspirationImages.image,
  )
  inspirationImages: InspirationImage[];
}

export default UserImage;
