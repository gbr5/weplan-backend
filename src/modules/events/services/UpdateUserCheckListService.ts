import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserCheckListsRepository from '@modules/events/repositories/IUserCheckListsRepository';

import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';

interface IRequest {
  name: string;
  priority_level: number;
  checked: boolean;
  id: string;
}
@injectable()
class UpdateUserCheckListService {
  constructor(
    @inject('UserCheckListsRepository')
    private checkListsRepository: IUserCheckListsRepository,
  ) {}

  public async execute({
    name,
    priority_level,
    checked,
    id,
  }: IRequest): Promise<UserCheckList> {
    const checkList = await this.checkListsRepository.findById(id);

    if (!checkList) {
      throw new AppError('Selected supplier not found.');
    }

    checkList.name = name;
    checkList.priority_level = priority_level;
    checkList.checked = checked;

    const updatedUserCheckList = await this.checkListsRepository.save(
      checkList,
    );

    return updatedUserCheckList;
  }
}

export default UpdateUserCheckListService;
