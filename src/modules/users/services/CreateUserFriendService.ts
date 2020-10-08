import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';
import IFriendGroupsRepository from '../repositories/IFriendGroupsRepository';

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

    @inject('FriendGroupsRepository')
    private friendGroupsRepository: IFriendGroupsRepository,

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
    console.log(
      'user_id',
      user_id,
      'friend_id',
      friend_id,
      'friend_group',
      friend_group,
    );
    // const name = 'All';
    // const userAllGroup = await this.friendGroupsRepository.findByNameAndUserId(
    //   user_id,
    //   name,
    // );
    // const checkUserFriendExitsInAllGroup = await this.userFriendsRepository.findByFriendId(
    //   friend_id,
    // );
    // console.log(checkUserFriendExitsInAllGroup);
    // const friendInAllGroup = checkUserFriendExitsInAllGroup.filter(
    //   user => user.FriendGroup.name === 'All',
    // );
    // if (friendInAllGroup) {
    //   if (userAllGroup) {
    //     await this.userFriendsRepository.create({
    //       user_id,
    //       friend_id,
    //       friend_group: userAllGroup.id,
    //     });
    //   }
    // }
    const checkUserFriendExits = await this.userFriendsRepository.findByFriendGroupAndFriendId(
      friend_id,
      friend_group,
    );
    console.log('checkUserFriendExits', checkUserFriendExits);
    console.log(
      'checkUserFriendExits?.FriendGroup.id !== friend_group',
      checkUserFriendExits?.FriendGroup.id !== friend_group,
      checkUserFriendExits?.FriendGroup.id,
      friend_group,
    );

    if (checkUserFriendExits?.FriendGroup.id === friend_group) {
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
