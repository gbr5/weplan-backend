import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICheckListsRepository from '@modules/checklists/repositories/ICheckListsRepository';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';

interface ICheckListDTO {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  priority: string;
  due_date: string;
}

@injectable()
class UpdateCheckListService {
  constructor(
    @inject('CheckListsRepository')
    private checkListsRepository: ICheckListsRepository,
  ) {}

  public async execute({
    id,
    name,
    color,
    isActive,
    priority,
    due_date,
  }: ICheckListDTO): Promise<CheckList> {
    const checkList = await this.checkListsRepository.findById(id);

    if (!checkList) {
      throw new AppError('CheckList not found.');
    }
    checkList.name = name;
    checkList.color = color;
    checkList.isActive = isActive;
    checkList.priority = priority;
    checkList.due_date = due_date;

    const updatedCheckList = await this.checkListsRepository.save(checkList);

    return updatedCheckList;
  }
}

export default UpdateCheckListService;
