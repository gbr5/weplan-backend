import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFriendGroupsRepository from '@modules/users/repositories/IFriendGroupsRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import FriendGroup from '@modules/users/infra/typeorm/entities/FriendGroup';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
class CreateFriendGroupService {
  constructor(
    @inject('FriendGroupsRepository')
    private friendGroupsRepository: IFriendGroupsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<FriendGroup> {
    const checkFriendGroupExits = await this.friendGroupsRepository.findByNameAndUserId(
      user_id,
      name,
    );

    if (checkFriendGroupExits) {
      throw new AppError('This name is already registered to other group!');
    }

    const friendGroup = await this.friendGroupsRepository.create({
      user_id,
      name,
    });

    return friendGroup;
  }
}

export default CreateFriendGroupService;
