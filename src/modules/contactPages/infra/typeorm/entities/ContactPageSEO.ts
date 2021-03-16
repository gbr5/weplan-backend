import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';
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
}

export default ContactPageSEO;
