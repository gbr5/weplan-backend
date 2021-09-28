import { injectable, inject } from 'tsyringe';

import IEventTaskFollowersRepository from '@modules/events/repositories/IEventTaskFollowersRepository';
import AppError from '@shared/errors/AppError';
import IEventTasksRepository from '../repositories/IEventTasksRepository';

interface IUserFollower {
  user_id: string;
  type: string;
}
interface IRequest {
  followers: IUserFollower[];
  task_id: string;
}

@injectable()
class CreateMultipleEventTaskFollowerService {
  constructor(
    @inject('EventTaskFollowersRepository')
    private eventTaskFollowersRepository: IEventTaskFollowersRepository,

    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,
  ) {}

  public async execute({ task_id, followers }: IRequest): Promise<void> {
    const eventTask = await this.eventTasksRepository.findById(task_id);

    if (!eventTask) {
      throw new AppError('Event task not found.');
    }

    followers.map(({ user_id }) => {
      const alreadyExists = eventTask.followers.find(
        e => e.user_id === user_id,
      );

      if (alreadyExists) {
        throw new AppError('Event task follower is already registered.');
      }
      return user_id;
    });

    Promise.all([
      followers.map(({ user_id, type }) =>
        this.eventTaskFollowersRepository.create({
          task_id,
          user_id,
          type,
        }),
      ),
    ]);
  }
}

export default CreateMultipleEventTaskFollowerService;
