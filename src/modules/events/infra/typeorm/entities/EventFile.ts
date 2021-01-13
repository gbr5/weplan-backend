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
import UserFile from '@modules/users/infra/typeorm/entities/UserFile';

@Entity('event_files')
class EventFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  file_id: string;

  @ManyToOne(() => UserFile, file => file.eventFiles, { eager: true })
  @JoinColumn({ name: 'file_id' })
  file: UserFile;

  @Column('uuid')
  event_id: string;

  @ManyToOne(() => Event, event => event.eventFiles)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventFile;
