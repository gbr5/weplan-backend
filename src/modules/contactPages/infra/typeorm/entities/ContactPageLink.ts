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

@Entity('contact_page_links')
class ContactPageLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  contact_page_id: string;

  @ManyToOne(() => UserContactPage, contactPage => contactPage.links)
  @JoinColumn({ name: 'contact_page_id' })
  contactPage: UserContactPage;

  @Column()
  label: string;

  @Column()
  url: string;

  @Column()
  text_color: string;

  @Column()
  background_color: string;

  @Column('numeric')
  position: number;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ContactPageLink;
