import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';

interface IRequest {
  user_id: string;
  friend_id: string;
  friend_group: string;
}

@injectable()
class CreateUserFriendService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    friend_id,
    friend_group,
  }: IRequest): Promise<UserFriend> {
    const checkUserFriendExits = await this.userFriendsRepository.findByFriendGroupAndFriendId(
      friend_id,
      friend_group,
    );

    if (checkUserFriendExits) {
      throw new AppError('This user is already registered to this group!');
    }

    const friend = await this.userFriendsRepository.create({
      user_id,
      friend_id,
      friend_group,
    });

    return friend;
  }
}

export default CreateUserFriendService;
