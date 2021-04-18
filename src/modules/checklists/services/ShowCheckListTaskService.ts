import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import ICheckListTasksRepository from '@modules/checklists/repositories/ICheckListTasksRepository';

@injectable()
class ShowCheckListTasksService {
  constructor(
    @inject('CheckListTasksRepository')
    private checkListTasksRepository: ICheckListTasksRepository,
  ) {}

  public async execute(id: string): Promise<CheckListTask | undefined> {
    const checkListTask = await this.checkListTasksRepository.findById(id);

    return checkListTask;
  }
}

export default ShowCheckListTasksService;
