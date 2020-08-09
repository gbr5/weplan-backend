import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import EventType from './EventType';
import EventSupplier from './EventTypeSupplier';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  trimmed_name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  users: User;

  @Column()
  event_type: string;

  @ManyToOne(() => EventType)
  @JoinColumn({ name: 'event_type' })
  event_types: EventType;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => EventSupplier, eventName => eventName)
  event_suppliers: EventSupplier;
}

export default Event;
// //                                 // //
//                                       //
// // //                           // // //
//                                       //
// // // //                     // // // //
//                                       //
// // // // //               // // // // //
//                                       //
// // // // // //         // // // // // //
//                                       //
// Parei tentando estabelecer as relations entre as tabelas, estudar no site do próprio typeorm para ver ao certo cono fazer e o que podereu utilizar mais para frente
//                                       //
// // // // // //         // // // // // //
//                                       //
// // // // //               // // // // //
//                                       //
// // // //                     // // // //
//                                       //
// // //                           // // //
//                                       //
// //                                 // // https://www.youtube.com/watch?v=S4Z5iMZpDmU&t=1743s 23:58
