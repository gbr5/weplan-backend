import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';
import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import Event from '@modules/events/infra/typeorm/entities/Event';

import CompanyInfo from './CompanyInfo';
import PersonInfo from './PersonInfo';
import UserToken from './UserToken';
import UserBirthdate from './UserBirthdate';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  trimmed_name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('boolean')
  isCompany: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }

  @OneToOne(() => CompanyInfo)
  company_info: CompanyInfo;

  @OneToOne(() => PersonInfo)
  person_info: PersonInfo;

  @OneToOne(() => UserBirthdate)
  user_birthdate: UserBirthdate;

  @OneToMany(() => UserToken, user_token => user_token.token)
  user_tokens: UserToken[];

  @OneToMany(() => Event, users => users)
  events: Event[];

  @OneToMany(() => EventSupplier, eventSupplier => eventSupplier)
  event_suppliers: EventSupplier[];
}

export default Users;
