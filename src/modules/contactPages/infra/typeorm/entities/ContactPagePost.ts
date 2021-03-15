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

@Entity('contact_page_posts')
class ContactPagePost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  contact_page_id: string;

  @ManyToOne(() => UserContactPage, contactPage => contactPage.posts)
  @JoinColumn({ name: 'contact_page_id' })
  contactPage: UserContactPage;

  @Column()
  image_url: string;

  @Column()
  destination_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ContactPagePost;
