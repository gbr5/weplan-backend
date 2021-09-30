import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ITaskFollowersRepository from '@modules/tasks/repositories/ITaskFollowersRepository';
import TaskFollower from '../infra/typeorm/entities/TaskFollower';

@injectable()
class ListTaskFollowersService {
  constructor(
    @inject('TaskFollowersRepository')
    private taskFollowersRepository: ITaskFollowersRepository,
  ) {}

  public async execute(task_id: string): Promise<TaskFollower[]> {
    const taskFollowers = await this.taskFollowersRepository.findByTaskId(
      task_id,
    );

    return taskFollowers;
  }
}

export default ListTaskFollowersService;
