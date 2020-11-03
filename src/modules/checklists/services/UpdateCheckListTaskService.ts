import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICheckListTasksRepository from '@modules/checklists/repositories/ICheckListTasksRepository';

import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';

interface ICheckListTaskDTO {
  id: string;
  task: string;
  color: string;
  isActive: boolean;
  priority: string;
  status: string;
  due_date: string;
}

@injectable()
class UpdateCheckListTaskService {
  constructor(
    @inject('CheckListTasksRepository')
    private checkListTasksRepository: ICheckListTasksRepository,
  ) {}

  public async execute({
    id,
    task,
    color,
    isActive,
    priority,
    status,
    due_date,
  }: ICheckListTaskDTO): Promise<CheckListTask> {
    const checkListTask = await this.checkListTasksRepository.findById(id);

    if (!checkListTask) {
      throw new AppError('CheckListTask not found.');
    }
    checkListTask.task = task;
    checkListTask.color = color;
    checkListTask.isActive = isActive;
    checkListTask.priority = priority;
    checkListTask.status = status;
    checkListTask.due_date = due_date;

    const updatedCheckListTask = await this.checkListTasksRepository.save(
      checkListTask,
    );

    return updatedCheckListTask;
  }
}

export default UpdateCheckListTaskService;
