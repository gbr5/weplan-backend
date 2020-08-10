import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserCheckListsRepository from '@modules/events/repositories/IUserCheckListsRepository';

interface IRequest {
  event_name: string;
  id: string;
}
@injectable()
class DeleteUserCheckListService {
  constructor(
    @inject('UserCheckListsRepository')
    private userCheckListsRepository: IUserCheckListsRepository,
  ) {}

  public async execute({ event_name, id }: IRequest): Promise<void> {
    const checkList = await this.userCheckListsRepository.findByIdAndEvent(
      event_name,
      id,
    );

    if (!checkList) {
      throw new AppError('Selected supplier not found.');
    }

    await this.userCheckListsRepository.delete(checkList);
  }
}

export default DeleteUserCheckListService;
