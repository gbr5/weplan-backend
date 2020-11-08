import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import ICheckListsRepository from '../repositories/ICheckListsRepository';

interface IRequest {
  company_id: string;
  owner_id: string;
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
  }: IRequest): Promise<CheckListTask[]> {
    const companyCheckLists = await this.checkListsRepository.findByUserId(
      company_id,
    );

    const owner_tasks: CheckListTask[] = [];
    companyCheckLists.map(checkList => {
      const tasks = checkList.tasks.filter(task => task.owner_id === owner_id);
      tasks.map(xtask => {
        owner_tasks.push(xtask);
        return xtask;
      });
      return tasks;
    });
    console.log(owner_tasks);

    return owner_tasks;
  }
}

export default ListCheckListTasksByCompanyAndOwnerIDService;
