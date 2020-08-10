import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import Event from '@modules/events/infra/typeorm/entities/Event';

@Entity('user_check_lists')
class UserCheckList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  priority_level: number;

  @Column('boolean')
  checked: boolean;

  @Column()
  event_name: string;

  @ManyToOne(() => Event, event => event.trimmed_name)
  @JoinColumn({ name: 'event_name' })
  eventName: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserCheckList;
