import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';

@Entity('friend_groups')
class FriendGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.userFriendGroups)
  @JoinColumn({ name: 'user_id' })
  groupOwner: User;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserFriend, userFriend => userFriend.friendGroup)
  userFriendGroups: UserFriend[];
}

export default FriendGroup;
