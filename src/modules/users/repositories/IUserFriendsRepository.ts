import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';
import ICreateUserFriendDTO from '@modules/users/dtos/ICreateUserFriendDTO';

export default interface IUserFriendsRepository {
  findAllFriends(user_id: string): Promise<UserFriend[]>;
  findByFriendId(friend_id: string): Promise<UserFriend[]>;
  findByGroupId(friend_id: string): Promise<UserFriend[]>;
  findByFriendGroupAndFriendId(
    friend_id: string,
    friend_group: string,
  ): Promise<UserFriend | undefined>;
  findByUserFriendId(id: string): Promise<UserFriend | undefined>;
  create(data: ICreateUserFriendDTO): Promise<UserFriend>;
  save(friend: UserFriend): Promise<UserFriend>;
  delete(friend: UserFriend): Promise<void>;
}
