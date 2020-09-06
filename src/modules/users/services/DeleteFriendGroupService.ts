import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFriendGroupsRepository from '@modules/users/repositories/IFriendGroupsRepository';

@injectable()
class DeleteContactTypeService {
  constructor(
    @inject('FriendGroupsRepository')
    private friendGroupsRepository: IFriendGroupsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const group = await this.friendGroupsRepository.findByFriendGroupId(id);
    console.log('15 - delete group service - group: ', group);
    if (!group) {
      throw new AppError('Group not found.');
    }
    console.log('19 - delete group service - group: ', group);

    await this.friendGroupsRepository.delete(group);
  }
}

export default DeleteContactTypeService;
