import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserGoogleProfile from './UserGoogleProfile';

@Entity('google_profiles')
class GoogleProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  googleId: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  givenName: string;

  @Column()
  familyName: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => UserGoogleProfile, user => user.profileObj)
  userGoogleProfile: UserGoogleProfile;
}

export default GoogleProfile;
