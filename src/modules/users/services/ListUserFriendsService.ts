import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import UserFriend from '../infra/typeorm/entities/UserFriend';

@injectable()
class ListUserFriendsService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,
  ) {}

  public async execute(user_id: string): Promise<UserFriend[]> {
    const userFriends = await this.userFriendsRepository.findByUserId(user_id);

    return userFriends;
  }
}

export default ListUserFriendsService;
