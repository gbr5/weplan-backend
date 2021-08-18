import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';

@injectable()
class DeleteContactTypeService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const friend = await this.userFriendsRepository.findById(id);

    if (!friend) {
      throw new AppError('Friend not found.');
    }
    const userAsFriend = await this.userFriendsRepository.findByFriendAndUserId(
      {
        friend_id: friend.user_id,
        user_id: friend.friend_id,
      },
    );
    if (userAsFriend) {
      await this.userFriendsRepository.delete(userAsFriend);
    }

    await this.userFriendsRepository.delete(friend);
  }
}

export default DeleteContactTypeService;
