import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserImage from './UserImage';

@Entity('image_participants')
class ImageParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  image_id: string;

  @ManyToOne(() => UserImage, userImage => userImage.imageParticipants)
  @JoinColumn({ name: 'image_id' })
  image: UserImage;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.imageParticipants, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ImageParticipant;
