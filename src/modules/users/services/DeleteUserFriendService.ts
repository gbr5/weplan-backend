import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';

@injectable()
class DeleteContactTypeService {
  constructor(
    @inject('UserFriendsRepository')
    private userFriendsRepository: IUserFriendsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const friend = await this.userFriendsRepository.findByUserFriendId(id);

    if (!friend) {
      throw new AppError('Friend not found.');
    }

    await this.userFriendsRepository.delete(friend);
  }
}

export default DeleteContactTypeService;
