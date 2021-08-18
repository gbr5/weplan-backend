import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import UserFriend from '../infra/typeorm/entities/UserFriend';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUserFriendRequestsService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<UserFriend[]> {
    const friendRequests = await this.userFriendsRepository.findFriendshipRequests(
      {
        friend_id: user_id,
      },
    );

    const ids = friendRequests.map(friend => friend.user_id);

    const users = await this.usersRepository.findByAllById(ids);

    const requests: UserFriend[] = [];
    friendRequests.map(friendRequest => {
      users.map(friend => {
        if (friend.id === friendRequest.user_id) {
          requests.push({
            ...friendRequest,
            friend,
            friend_id: friend.id,
            user_id,
          });
        }
        return '';
      });
      return '';
    });

    return requests;
  }
}

export default ListUserFriendRequestsService;
