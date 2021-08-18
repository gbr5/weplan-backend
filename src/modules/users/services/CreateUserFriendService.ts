import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';

interface IRequest {
  user_id: string;
  friend_id: string;
}

@injectable()
class CreateUserFriendService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,
  ) {}

  public async execute({ user_id, friend_id }: IRequest): Promise<UserFriend> {
    if (user_id === friend_id)
      throw new AppError(
        'Is not possible to create a friend relation with yourself!',
      );

    const checkUserFriendExits = await this.userFriendsRepository.findByFriendAndUserId(
      {
        friend_id,
        user_id,
      },
    );

    if (checkUserFriendExits) throw new AppError('Friend already exists!');

    const findFriendRequest = await this.userFriendsRepository.findByFriendAndUserId(
      {
        friend_id: user_id,
        user_id: friend_id,
      },
    );
    if (findFriendRequest) {
      findFriendRequest.isConfirmed = true;
      await this.userFriendsRepository.save(findFriendRequest);
      const friend = await this.userFriendsRepository.create({
        user_id,
        friend_id,
        isConfirmed: true,
      });

      return friend;
    }
    const friend = await this.userFriendsRepository.create({
      user_id,
      friend_id,
      isConfirmed: false,
    });

    return friend;
  }
}

export default CreateUserFriendService;
