import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserCheckListsRepository from '@modules/events/repositories/IUserCheckListsRepository';

@injectable()
class DeleteUserCheckListService {
  constructor(
    @inject('UserCheckListsRepository')
    private userCheckListsRepository: IUserCheckListsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkList = await this.userCheckListsRepository.findById(id);

    if (!checkList) {
      throw new AppError('Selected supplier not found.');
    }

    await this.userCheckListsRepository.delete(checkList);
  }
}

export default DeleteUserCheckListService;
