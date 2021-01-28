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
import InspirationImage from '@modules/users/infra/typeorm/entities/InspirationImage';

@Entity('event_inspiration_images')
class EventInspirationImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  inspiration_image_id: string;

  @ManyToOne(() => InspirationImage, image => image.eventInspirationImages, {
    eager: true,
  })
  @JoinColumn({ name: 'inspiration_image_id' })
  inspirationImage: InspirationImage;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.eventInspirationImages)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventInspirationImage;
