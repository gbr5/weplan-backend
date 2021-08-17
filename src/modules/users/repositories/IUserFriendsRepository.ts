import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';
import ICreateUserFriendDTO from '@modules/users/dtos/ICreateUserFriendDTO';

export default interface IUserFriendsRepository {
  findByFriendId(friend_id: string): Promise<UserFriend | undefined>;
  findById(id: string): Promise<UserFriend | undefined>;
  findByUserId(user_id: string): Promise<UserFriend[]>;
  create(data: ICreateUserFriendDTO): Promise<UserFriend>;
  save(friend: UserFriend): Promise<UserFriend>;
  delete(friend: UserFriend): Promise<void>;
}
