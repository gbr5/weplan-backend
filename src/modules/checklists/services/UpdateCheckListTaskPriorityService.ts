import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICheckListTasksRepository from '@modules/checklists/repositories/ICheckListTasksRepository';

import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';

interface ICheckListTaskDTO {
  id: string;
  priority: string;
}

@injectable()
class UpdateCheckListTaskPriorityService {
  constructor(
    @inject('CheckListTasksRepository')
    private checkListTasksRepository: ICheckListTasksRepository,
  ) {}

  public async execute({
    id,
    priority,
  }: ICheckListTaskDTO): Promise<CheckListTask> {
    const checkListTask = await this.checkListTasksRepository.findById(id);

    if (!checkListTask) {
      throw new AppError('CheckListTask not found.');
    }
    checkListTask.priority = priority;

    const updatedCheckListTask = await this.checkListTasksRepository.save(
      checkListTask,
    );

    return updatedCheckListTask;
  }
}

export default UpdateCheckListTaskPriorityService;
