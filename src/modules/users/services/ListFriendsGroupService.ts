import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import FriendGroup from '@modules/users/infra/typeorm/entities/FriendGroup';
import IFriendGroupsRepository from '@modules/users/repositories/IFriendGroupsRepository';

@injectable()
class ListFriendGroupsService {
  constructor(
    @inject('FriendGroupsRepository')
    private friendGroupsRepository: IFriendGroupsRepository,
  ) {}

  public async execute(user_id: string): Promise<FriendGroup[]> {
    const friendGroups = await this.friendGroupsRepository.findAllGroups(
      user_id,
    );

    return friendGroups;
  }
}

export default ListFriendGroupsService;
