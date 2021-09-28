import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventTaskFollowersRepository from '@modules/events/repositories/IEventTaskFollowersRepository';
import EventTaskFollower from '../infra/typeorm/entities/EventTaskFollower';

@injectable()
class ListEventTaskFollowersService {
  constructor(
    @inject('EventTaskFollowersRepository')
    private eventTaskFollowersRepository: IEventTaskFollowersRepository,
  ) {}

  public async execute(event_id: string): Promise<EventTaskFollower[]> {
    const eventTaskFollowers = await this.eventTaskFollowersRepository.findByTaskId(
      event_id,
    );

    return eventTaskFollowers;
  }
}

export default ListEventTaskFollowersService;
