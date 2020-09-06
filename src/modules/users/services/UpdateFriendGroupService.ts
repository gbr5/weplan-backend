import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFriendGroupsRepository from '@modules/users/repositories/IFriendGroupsRepository';

import FriendGroup from '@modules/users/infra/typeorm/entities/FriendGroup';

interface IRequest {
  name: string;
  id: string;
}
@injectable()
class UpdateFriendGroupService {
  constructor(
    @inject('FriendGroupsRepository')
    private friendGoupsRepository: IFriendGroupsRepository,
  ) {}

  public async execute({ name, id }: IRequest): Promise<FriendGroup> {
    const friendGoup = await this.friendGoupsRepository.findByFriendGroupId(id);

    if (!friendGoup) {
      throw new AppError('UserContact information not found.');
    }

    friendGoup.name = name;

    const updatedFriendGroup = await this.friendGoupsRepository.save(
      friendGoup,
    );

    return updatedFriendGroup;
  }
}

export default UpdateFriendGroupService;
