import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserCheckListsRepository from '@modules/events/repositories/IUserCheckListsRepository';

import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';

interface IRequest {
  priority_level: number;
  id: string;
}
@injectable()
class UpdateCheckListItemPriorityLevelService {
  constructor(
    @inject('UserCheckListsRepository')
    private checkListsRepository: IUserCheckListsRepository,
  ) {}

  public async execute({
    priority_level,
    id,
  }: IRequest): Promise<UserCheckList> {
    const checkList = await this.checkListsRepository.findById(id);

    if (!checkList) {
      throw new AppError('Selected supplier not found.');
    }

    checkList.priority_level = priority_level;

    const updatedUserCheckList = await this.checkListsRepository.save(
      checkList,
    );

    return updatedUserCheckList;
  }
}

export default UpdateCheckListItemPriorityLevelService;
