import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITaskFollowersRepository from '@modules/tasks/repositories/ITaskFollowersRepository';

@injectable()
class DeleteTaskFollowerService {
  constructor(
    @inject('TaskFollowersRepository')
    private taskFollowersRepository: ITaskFollowersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const taskFollower = await this.taskFollowersRepository.findById(id);

    if (!taskFollower) {
      throw new AppError('Task follower not found.');
    }

    await this.taskFollowersRepository.delete(id);
  }
}

export default DeleteTaskFollowerService;
