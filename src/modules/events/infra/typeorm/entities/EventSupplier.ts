import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Event from '@modules/events/infra/typeorm/entities/Event';

@Entity('event_supplier')
class EventSupplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  supplier_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'supplier_id' })
  eventSupplier: User;

  @Column()
  event_name: string;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_name' })
  eventName: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventSupplier;
