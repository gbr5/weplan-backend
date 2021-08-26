import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import Event from '@modules/events/infra/typeorm/entities/Event';
import UserImage from '@modules/users/infra/typeorm/entities/UserImage';

@Entity('event_images')
class EventImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  image_id: string;

  @ManyToOne(() => UserImage, image => image.userEventImages)
  @JoinColumn({ name: 'image_id' })
  image: UserImage;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.eventImages)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventImage;
