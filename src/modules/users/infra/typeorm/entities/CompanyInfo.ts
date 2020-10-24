import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';

import User from '@modules/users/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';

@Entity('company_info')
class CompanyInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_id: string;

  @Column('uuid')
  user_id: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  Company: User;

  @Column()
  name: string;

  @Column()
  logo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'logo_url' })
  getAvatarUrl(): string | null {
    if (!this.logo) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.logo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.logo}`;
      default:
        return null;
    }
  }
}

export default CompanyInfo;
