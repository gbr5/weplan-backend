import CompanyContact from '@modules/suppliers/infra/typeorm/entities/CompanyContact';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import UserFile from './UserFile';

@Entity('contact_files')
class ContactFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  file_id: string;

  @ManyToOne(() => UserFile, file => file.contactFiles, { eager: true })
  @JoinColumn({ name: 'file_id' })
  file: UserFile;

  @Column('uuid')
  contact_id: string;

  @ManyToOne(() => CompanyContact, contact => contact.fileContacts)
  @JoinColumn({ name: 'contact_id' })
  contactFile: CompanyContact;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ContactFile;
