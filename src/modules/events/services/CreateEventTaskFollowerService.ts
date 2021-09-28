import { injectable, inject } from 'tsyringe';

import EventTaskFollower from '@modules/events/infra/typeorm/entities/EventTaskFollower';
import IEventTaskFollowersRepository from '@modules/events/repositories/IEventTaskFollowersRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IEventTasksRepository from '../repositories/IEventTasksRepository';
import ICreateEventTaskFollowerDTO from '../dtos/ICreateEventTaskFollowerDTO';

@injectable()
class CreateEventTaskFollowerService {
  constructor(
    @inject('EventTaskFollowersRepository')
    private eventTaskFollowersRepository: IEventTaskFollowersRepository,

    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    task_id,
    user_id,
  }: ICreateEventTaskFollowerDTO): Promise<EventTaskFollower> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const eventTask = await this.eventTasksRepository.findById(task_id);

    if (!eventTask) {
      throw new AppError('Event task not found.');
    }

    const eventTaskFollower = await this.eventTaskFollowersRepository.create({
      task_id,
      user_id,
    });

    return eventTaskFollower;
  }
}

export default CreateEventTaskFollowerService;
