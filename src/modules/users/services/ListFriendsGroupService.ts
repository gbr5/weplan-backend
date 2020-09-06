import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import FriendGroup from '@modules/users/infra/typeorm/entities/FriendGroup';
import IFriendGroupsRepository from '@modules/users/repositories/IFriendGroupsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListFriendGroupsService {
  constructor(
    @inject('FriendGroupsRepository')
    private friendGroupsRepository: IFriendGroupsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<FriendGroup[]> {
    const FriendGroups = await this.friendGroupsRepository.findAllGroups(
      user_id,
    );

    return FriendGroups;
  }
}

export default ListFriendGroupsService;
