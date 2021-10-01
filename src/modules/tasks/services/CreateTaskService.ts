import { injectable, inject } from 'tsyringe';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import ITaskFollowersRepository from '../repositories/ITaskFollowersRepository';

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('TaskFollowersRepository')
    private taskFollowersRepository: ITaskFollowersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    title,
    due_date,
    priority,
    status,
    user_id,
  }: ICreateTaskDTO): Promise<Task> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found!');

    const newTask = await this.tasksRepository.create({
      due_date,
      priority,
      status,
      title,
      user_id,
    });
    await this.taskFollowersRepository.create({
      task_id: newTask.id,
      type: 'master',
      user_id,
    });
    return newTask;
  }
}

export default CreateTaskService;
