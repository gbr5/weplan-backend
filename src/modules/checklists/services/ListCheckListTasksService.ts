import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import ICheckListTasksRepository from '@modules/checklists/repositories/ICheckListTasksRepository';

@injectable()
class ListCheckListTasksService {
  constructor(
    @inject('CheckListTasksRepository')
    private checkListTasksRepository: ICheckListTasksRepository,
  ) {}

  public async execute(check_list_id: string): Promise<CheckListTask[]> {
    const checkListTasks = await this.checkListTasksRepository.findByCheckListId(
      check_list_id,
    );

    return checkListTasks;
  }
}

export default ListCheckListTasksService;
