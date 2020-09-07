import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserDTO from '@modules/events/dtos/IUserDTO';
import IPersonInfoRepository from '../repositories/IPersonInfoRepository';

@injectable()
class ListUserFriendsService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,

    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<IUserDTO[]> {
    const userFriends = await this.userFriendsRepository.findAllFriends(
      user_id,
    );

    const friends = ([] as unknown) as Promise<IUserDTO[]>;

    userFriends.map(async friend => {
      (await friends).push({
        id: friend.Friend.id,
        name: friend.Friend.name,
        avatar: friend.Friend.avatar ? friend.Friend.avatar : '',
      });
    });

    return friends;
  }
}

export default ListUserFriendsService;
