import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';
import ICreateUserFriendDTO from '@modules/users/dtos/ICreateUserFriendDTO';
import IFindByFriendAndUserIdDTO from '../dtos/IFindByFriendAnnUserIdDTO';
import IListUserFriendRequestsDTO from '../dtos/IListUserFriendRequestsDTO';

export default interface IUserFriendsRepository {
  findFriendshipRequests(
    data: IListUserFriendRequestsDTO,
  ): Promise<UserFriend[]>;
  findByFriendAndUserId(
    data: IFindByFriendAndUserIdDTO,
  ): Promise<UserFriend | undefined>;
  findById(id: string): Promise<UserFriend | undefined>;
  findByUserId(user_id: string): Promise<UserFriend[]>;
  create(data: ICreateUserFriendDTO): Promise<UserFriend>;
  save(friend: UserFriend): Promise<UserFriend>;
  delete(friend: UserFriend): Promise<void>;
}
