import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTaskFollowersRepository from '@modules/events/repositories/IEventTaskFollowersRepository';

@injectable()
class DeleteEventTaskFollowerService {
  constructor(
    @inject('EventTaskFollowersRepository')
    private eventTaskFollowersRepository: IEventTaskFollowersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventTaskFollower = await this.eventTaskFollowersRepository.findById(
      id,
    );

    if (!eventTaskFollower) {
      throw new AppError('Event date not found.');
    }

    await this.eventTaskFollowersRepository.delete(id);
  }
}

export default DeleteEventTaskFollowerService;
