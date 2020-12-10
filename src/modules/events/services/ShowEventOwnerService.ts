import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import EventOwner from '../infra/typeorm/entities/EventOwner';

@injectable()
class ShowEventOwnerService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(
    event_id: string,
    owner_id: string,
  ): Promise<EventOwner> {
    const eventOwner = await this.eventOwnersRepository.findByEventAndOwnerId(
      event_id,
      owner_id,
    );

    if (!eventOwner) {
      throw new AppError('Event owner not found.');
    }

    return eventOwner;
  }
}

export default ShowEventOwnerService;
