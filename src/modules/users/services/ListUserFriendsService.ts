import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserFriendDTO from '../dtos/IUserFriendDTO';

@injectable()
class ListUserFriendsService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<IUserFriendDTO[]> {
    const userFriends = await this.userFriendsRepository.findAllFriends(
      user_id,
    );
    console.log(userFriends);
    const friends = ([] as unknown) as Promise<IUserFriendDTO[]>;

    userFriends.map(async friend => {
      (await friends).push({
        id: friend.friend_id,
        name: friend.Friend.name,
      });
    });

    return friends;
  }
}

export default ListUserFriendsService;
