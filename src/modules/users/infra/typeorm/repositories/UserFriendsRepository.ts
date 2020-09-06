import { getRepository, Repository } from 'typeorm';

import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import ICreateUserFriendDTO from '@modules/users/dtos/ICreateUserFriendDTO';

import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';
import AppError from '@shared/errors/AppError';

class UserFriendsRepository implements IUserFriendsRepository {
  private ormRepository: Repository<UserFriend>;

  constructor() {
    this.ormRepository = getRepository(UserFriend);
  }

  public async findByUserFriendId(id: string): Promise<UserFriend | undefined> {
    const friend = await this.ormRepository.findOne(id);

    return friend;
  }

  public async findByFriendGroupAndFriendId(
    friend_id: string,
    friend_group: string,
  ): Promise<UserFriend | undefined> {
    const friend = await this.ormRepository.findOne({
      where: { friend_id, friend_group },
    });

    return friend;
  }

  public async findByGroupId(friend_group: string): Promise<UserFriend[]> {
    const friends = await this.ormRepository.find({
      where: { friend_group },
    });

    return friends;
  }

  public async findByFriendId(friend_id: string): Promise<UserFriend[]> {
    const friends = await this.ormRepository.find({
      where: { friend_id },
    });

    return friends;
  }

  public async findAllFriends(user_id: string): Promise<UserFriend[]> {
    const friends = await this.ormRepository.find({
      where: { user_id },
    });

    return friends;
  }

  public async create(userData: ICreateUserFriendDTO): Promise<UserFriend> {
    const friend = this.ormRepository.create(userData);

    await this.ormRepository.save(friend);

    return friend;
  }

  public async save(userFriend: UserFriend): Promise<UserFriend> {
    return this.ormRepository.save(userFriend);
  }

  public async delete({ id }: UserFriend): Promise<void> {
    const friend = await this.ormRepository.findOne(id);

    if (!friend) {
      throw new AppError('Friend not found!');
    }

    await this.ormRepository.delete({ id });
  }
}

export default UserFriendsRepository;
