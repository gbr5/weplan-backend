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

@Entity('user_check_list')
class UserCheckList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  priority_level: number;

  @Column()
  status: number;

  @Column()
  due_date: Date;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.id)
  @JoinColumn({ name: 'event_id' })
  Event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserCheckList;
