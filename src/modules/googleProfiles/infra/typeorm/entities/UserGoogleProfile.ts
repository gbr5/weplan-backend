import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import GoogleProfile from './GoogleProfile';

@Entity('user_google_profiles')
class UserGoogleProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  google_profile_id: string;

  @OneToOne(
    () => GoogleProfile,
    googleProfile => googleProfile.userGoogleProfile,
  )
  @JoinColumn({ name: 'google_profile_id' })
  profileObj: GoogleProfile;

  @Column('uuid')
  user_id: string;

  @OneToOne(() => User, user => user.googleProfile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserGoogleProfile;
