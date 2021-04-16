import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import ICheckListsRepository from '../repositories/ICheckListsRepository';

interface IRequest {
  company_id: string;
  owner_id: string;
  day?: number;
  month?: number;
  year?: number;
}

@injectable()
class ListCheckListTasksByCompanyAndOwnerIDService {
  constructor(
    @inject('CheckListsRepository')
    private checkListsRepository: ICheckListsRepository,
  ) {}

  public async execute({
    company_id,
    owner_id,
    day,
    month,
    year,
  }: IRequest): Promise<CheckListTask[]> {
    const companyCheckLists = await this.checkListsRepository.findByUserId(
      company_id,
    );

    const owner_tasks: CheckListTask[] = [];
    companyCheckLists.map(checkList => {
      const tasks = checkList.tasks
        .filter(task => task.isActive)
        .filter(task => task.owner_id === owner_id);
      tasks.map(xtask => {
        owner_tasks.push(xtask);
        return xtask;
      });
      return tasks;
    });

    if (day && month && year) {
      const sorted_owner_tasks = owner_tasks.filter(task => {
        const selectedDate = `${year}/${month}/${day}`;
        const taskDueDateFormated = new Date(task.due_date);
        const taskDate = `${taskDueDateFormated.getFullYear()}/${
          taskDueDateFormated.getMonth() + 1
        }/${taskDueDateFormated.getDate()}`;
        return selectedDate === taskDate;
      });
      return sorted_owner_tasks;
    }

    return owner_tasks;
  }
}

export default ListCheckListTasksByCompanyAndOwnerIDService;
