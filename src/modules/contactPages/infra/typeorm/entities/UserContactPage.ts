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