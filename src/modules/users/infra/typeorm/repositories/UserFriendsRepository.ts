import { getRepository, Repository } from 'typeorm';

import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import ICreateUserFriendDTO from '@modules/users/dtos/ICreateUserFriendDTO';

import UserFriend from '@modules/users/infra/typeorm/entities/UserFriend';
import AppError from '@shared/errors/AppError';
import IFindByFriendAndUserIdDTO from '@modules/users/dtos/IFindByFriendAnnUserIdDTO';
import IListUserFriendRequestsDTO from '@modules/users/dtos/IListUserFriendRequestsDTO';

class UserFriendsRepository implements IUserFriendsRepository {
  private ormRepository: Repository<UserFriend>;

  constructor() {
    this.ormRepository = getRepository(UserFriend);
  }

  public async findById(id: string): Promise<UserFriend | undefined> {
    const friend = await this.ormRepository.findOne(id);

    return friend;
  }

  public async findByUserId(user_id: string): Promise<UserFriend[]> {
    const friend = await this.ormRepository.find({
      where: { user_id },
    });

    return friend;
  }

  public async findByFriendAndUserId({
    friend_id,
    user_id,
  }: IFindByFriendAndUserIdDTO): Promise<UserFriend | undefined> {
    const friend = await this.ormRepository.findOne({
      where: { user_id, friend_id },
    });

    return friend;
  }

  public async findFriendshipRequests({
    friend_id,
  }: IListUserFriendRequestsDTO): Promise<UserFriend[]> {
    const friend = await this.ormRepository.find({
      where: { friend_id, isConfirmed: false },
    });

    return friend;
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
