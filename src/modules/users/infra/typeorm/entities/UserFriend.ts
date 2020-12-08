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
  user: User;

  @Column('uuid')
  friend_id: string;

  @ManyToOne(() => User, friend => friend.friends, { eager: true })
  @JoinColumn({ name: 'friend_id' })
  friend: User;

  @Column('uuid')
  friend_group: string;

  @ManyToOne(() => FriendGroup, group => group.userFriendGroups, {
    eager: true,
  })
  @JoinColumn({ name: 'friend_group' })
  friendGroup: FriendGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserFriend;
