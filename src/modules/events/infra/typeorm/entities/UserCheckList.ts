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
  event_id: string;

  @ManyToOne(() => Event, { eager: true })
  @JoinColumn({ name: 'event_id' })
  Event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserCheckList;
