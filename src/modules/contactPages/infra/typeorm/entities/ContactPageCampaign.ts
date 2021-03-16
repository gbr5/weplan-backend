import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import UserContactPage from './UserContactPage';

@Entity('contact_page_campaigns')
class ContactPageCampaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  contact_page_id: string;

  @ManyToOne(() => UserContactPage, contactPage => contactPage.campaigns)
  @JoinColumn({ name: 'contact_page_id' })
  contactPage: UserContactPage;

  @Column()
  name: string;

  @Column()
  background_color: string;

  @Column()
  text_color: string;

  @Column()
  message: string;

  @Column()
  cta_label: string;

  @Column()
  cta_background_color: string;

  @Column()
  cta_text_color: string;

  @Column()
  url: string;

  @Column('boolean')
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ContactPageCampaign;
