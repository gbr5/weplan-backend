import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';
import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';
import UserContactPage from './UserContactPage';

@Entity('contact_page_seo')
class ContactPageSEO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  contact_page_id: string;

  @OneToOne(() => UserContactPage, contactPage => contactPage.seo)
  @JoinColumn({ name: 'contact_page_id' })
  contactPage: UserContactPage;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column('boolean')
  shouldIndexPage: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'main_image_url' })
  getImageUrl(): string | null {
    if (!this.image_url) {
      return null;
    }
    if (this.image_url.includes('https://')) {
      return this.image_url;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image_url}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.image_url}`;
      default:
        return null;
    }
  }
}

export default ContactPageSEO;
