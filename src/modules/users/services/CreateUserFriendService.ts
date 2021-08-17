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
    if (user_id === friend_id) throw new AppError('Friend already exists!');

    const checkUserFriendExits = await this.userFriendsRepository.findByFriendId(
      friend_id,
    );

    if (checkUserFriendExits) throw new AppError('Friend already exists!');

    const friend = await this.userFriendsRepository.create({
      user_id,
      friend_id,
      isConfirmed: false,
    });

    console.log({ friend });
    return friend;
  }
}

export default CreateUserFriendService;
