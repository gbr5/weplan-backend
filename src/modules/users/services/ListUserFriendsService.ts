import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';
import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserFriendsService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<UserFriend[]> {
    const UserFriends = await this.userFriendsRepository.findAllFriends(
      user_id,
    );

    return UserFriends;
  }
}

export default ListUserFriendsService;
