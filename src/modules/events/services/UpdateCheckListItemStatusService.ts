import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserCheckListsRepository from '@modules/events/repositories/IUserCheckListsRepository';

import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';

interface IRequest {
  status: number;
  id: string;
}
@injectable()
class UpdateCheckListItemStatusService {
  constructor(
    @inject('UserCheckListsRepository')
    private checkListsRepository: IUserCheckListsRepository,
  ) {}

  public async execute({ status, id }: IRequest): Promise<UserCheckList> {
    const checkList = await this.checkListsRepository.findById(id);

    if (!checkList) {
      throw new AppError('Selected supplier not found.');
    }

    checkList.status = status;

    const updatedUserCheckList = await this.checkListsRepository.save(
      checkList,
    );

    return updatedUserCheckList;
  }
}

export default UpdateCheckListItemStatusService;
