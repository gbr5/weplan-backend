import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import ContactPagePost from './ContactPagePost';
import ContactPageLink from './ContactPageLink';
import ContactPageForm from './ContactPageForm';
import ContactPageCampaign from './ContactPageCampaign';
import ContactPageSEO from './ContactPageSEO';

@Entity('user_contact_pages')
class UserContactPage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.contactPages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  slug: string;

  @Column()
  image_url: string;

  @Column()
  title: string;

  @Column()
  cta_label: string;

  @Column()
  cta_url: string;

  @Column('boolean')
  isActive: boolean;

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

  @OneToMany(() => ContactPagePost, post => post.contactPage, {
    eager: true,
  })
  posts: ContactPagePost[];

  @OneToMany(() => ContactPageLink, link => link.contactPage, {
    eager: true,
  })
  links: ContactPageLink[];

  @OneToMany(() => ContactPageForm, form => form.contactPage, {
    eager: true,
  })
  forms: ContactPageForm[];

  @OneToMany(() => ContactPageCampaign, campaign => campaign.contactPage, {
    eager: true,
  })
  campaigns: ContactPageCampaign[];

  @OneToOne(() => ContactPageSEO, seo => seo.contactPage, {
    eager: true,
  })
  seo: ContactPageSEO;
}

export default UserContactPage;
