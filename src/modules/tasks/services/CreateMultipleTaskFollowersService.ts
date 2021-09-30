import { injectable, inject } from 'tsyringe';

import ITaskFollowersRepository from '@modules/tasks/repositories/ITaskFollowersRepository';
import AppError from '@shared/errors/AppError';
import ITasksRepository from '../repositories/ITasksRepository';

interface IUserFollower {
  user_id: string;
  type: string;
}
interface IRequest {
  followers: IUserFollower[];
  task_id: string;
}

@injectable()
class CreateMultipleTaskFollowersService {
  constructor(
    @inject('TaskFollowersRepository')
    private taskFollowersRepository: ITaskFollowersRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({ task_id, followers }: IRequest): Promise<void> {
    const task = await this.tasksRepository.findById(task_id);

    if (!task) {
      throw new AppError(' task not found.');
    }

    followers.map(({ user_id }) => {
      const alreadyExists = task.followers.find(e => e.user_id === user_id);

      if (alreadyExists) {
        throw new AppError(' task follower is already registered.');
      }
      return user_id;
    });

    Promise.all([
      followers.map(({ user_id, type }) =>
        this.taskFollowersRepository.create({
          task_id,
          user_id,
          type,
        }),
      ),
    ]);
  }
}

export default CreateMultipleTaskFollowersService;
