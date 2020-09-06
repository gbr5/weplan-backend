import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import FriendGroup from '@modules/users/infra/typeorm/entities/FriendGroup';

@Entity('user_friends')
class UserFriend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  UserFriend: User;

  @Column('uuid')
  friend_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'friend_id' })
  Friend: User;

  @Column('uuid')
  friend_group: string;

  @ManyToOne(() => FriendGroup, group => group.id)
  @JoinColumn({ name: 'friend_group' })
  FriendGroup: FriendGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserFriend;
