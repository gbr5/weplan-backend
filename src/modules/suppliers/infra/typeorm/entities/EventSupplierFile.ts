import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';
import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';

@Entity('event_supplier_files')
class EventSupplierFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  supplier_id: string;

  @ManyToOne(() => EventSupplier, event_supplier => event_supplier.files)
  @JoinColumn({ name: 'supplier_id' })
  eventSupplier: EventSupplier;

  @Column()
  name: string;

  @Column()
  file_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'url' })
  getAvatarUrl(): string | null {
    if (!this.file_name) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.file_name}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.file_name}`;
      default:
        return null;
    }
  }
}

export default EventSupplierFile;
