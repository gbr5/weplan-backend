import EventInspirationImage from '@modules/events/infra/typeorm/entities/EventInspirationImage';
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
import User from './User';

import UserImage from './UserImage';

@Entity('inspiration_images')
class InspirationImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  image_id: string;

  @ManyToOne(() => UserImage, image => image.inspirationImages, { eager: true })
  @JoinColumn({ name: 'image_id' })
  image: UserImage;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.userInspirationImages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => EventInspirationImage,
    eventInspirationImages => eventInspirationImages.inspirationImage,
  )
  eventInspirationImages: EventInspirationImage[];
}

export default InspirationImage;
