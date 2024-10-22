import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';

@injectable()
class UpdateUserFriendService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,
  ) {}

  public async execute(id: string): Promise<UserFriend> {
    const friend = await this.userFriendsRepository.findById(id);

    if (!friend) throw new AppError('Friend not found!');

    friend.isConfirmed = true;
    const updatedFriend = await this.userFriendsRepository.save(friend);

    const findFriend = await this.userFriendsRepository.findByFriendAndUserId({
      friend_id: friend.user_id,
      user_id: friend.friend_id,
    });

    if (!findFriend) {
      await this.userFriendsRepository.create({
        friend_id: friend.user_id,
        user_id: friend.friend_id,
        isConfirmed: true,
      });
      return updatedFriend;
    }

    findFriend.isConfirmed = true;
    await this.userFriendsRepository.save(findFriend);
    return updatedFriend;
  }
}

export default UpdateUserFriendService;
