import { injectable, inject } from 'tsyringe';

import TaskFollower from '@modules/tasks/infra/typeorm/entities/TaskFollower';
import ITaskFollowersRepository from '@modules/tasks/repositories/ITaskFollowersRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITasksRepository from '../repositories/ITasksRepository';
import ICreateTaskFollowerDTO from '../dtos/ICreateTaskFollowerDTO';

@injectable()
class CreateTaskFollowerService {
  constructor(
    @inject('TaskFollowersRepository')
    private taskFollowersRepository: ITaskFollowersRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    task_id,
    user_id,
    type,
  }: ICreateTaskFollowerDTO): Promise<TaskFollower> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const task = await this.tasksRepository.findById(task_id);

    if (!task) {
      throw new AppError(' task not found.');
    }

    const alreadyExists = task.followers.find(e => e.user_id === user_id);

    if (alreadyExists) {
      throw new AppError(' task follower is already registered.');
    }

    const taskFollower = await this.taskFollowersRepository.create({
      task_id,
      user_id,
      type,
    });

    return taskFollower;
  }
}

export default CreateTaskFollowerService;
