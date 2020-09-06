import { getRepository, Repository } from 'typeorm';

import IFriendGroupsRepository from '@modules/users/repositories/IFriendGroupsRepository';
import ICreateFriendGroupDTO from '@modules/users/dtos/ICreateFriendGroupDTO';

import FriendGroup from '@modules/users/infra/typeorm/entities/FriendGroup';

class FriendGroupsRepository implements IFriendGroupsRepository {
  private ormRepository: Repository<FriendGroup>;

  constructor() {
    this.ormRepository = getRepository(FriendGroup);
  }

  public async findByFriendGroupId(
    id: string,
  ): Promise<FriendGroup | undefined> {
    const friend = await this.ormRepository.findOne(id);

    return friend;
  }

  public async findByNameAndUserId(
    user_id: string,
    name: string,
  ): Promise<FriendGroup | undefined> {
    const friend = await this.ormRepository.findOne({
      where: { user_id, name },
    });

    return friend;
  }

  public async findAllGroups(user_id: string): Promise<FriendGroup[]> {
    const friends = await this.ormRepository.find({
      where: { user_id },
    });

    return friends;
  }

  public async create(userData: ICreateFriendGroupDTO): Promise<FriendGroup> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async delete({ id }: FriendGroup): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async save(friendGroup: FriendGroup): Promise<FriendGroup> {
    return this.ormRepository.save(friendGroup);
  }
}

export default FriendGroupsRepository;
