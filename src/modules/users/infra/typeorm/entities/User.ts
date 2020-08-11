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
import Event from '@modules/events/infra/typeorm/entities/Event';
import EventTypeSupplier from '@modules/events/infra/typeorm/entities/EventTypeSupplier';
import SelectedSupplier from '@modules/events/infra/typeorm/entities/SelectedSupplier';

import EventPlanner from '@modules/events/infra/typeorm/entities/EventPlanner';
import CompanyInfo from './CompanyInfo';
import PersonInfo from './PersonInfo';
import UserToken from './UserToken';
import UserBirthdate from './UserBirthdate';

@Entity('users')
class User {
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

  @OneToOne(() => CompanyInfo, company_info => company_info.user_id)
  company_info: CompanyInfo;

  @OneToOne(() => PersonInfo, person_info => person_info.user_id)
  person_info: PersonInfo;

  @OneToOne(() => UserBirthdate, user_birthdate => user_birthdate.user_id)
  user_birthdate: UserBirthdate;

  @OneToMany(() => UserToken, user_token => user_token.token)
  user_tokens: UserToken;

  @OneToOne(() => Event, event => event.user_id)
  events: Event;

  @OneToMany(
    () => SelectedSupplier,
    selected_supplier => selected_supplier.supplier_id,
  )
  selected_suppliers: SelectedSupplier;

  @OneToMany(
    () => EventTypeSupplier,
    event_type_supplier => event_type_supplier.user_id,
  )
  event_type_suppliers: EventTypeSupplier;

  @OneToMany(() => EventPlanner, event_planner => event_planner.event_name)
  event_planners: string;
}

export default User;
