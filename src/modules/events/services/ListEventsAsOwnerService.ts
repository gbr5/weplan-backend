import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import EventOwner from '../infra/typeorm/entities/EventOwner';

@injectable()
class ListEventsAsOwnerService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<EventOwner[]> {
    const eventOwners = await this.eventOwnersRepository.findByOwnerId(user_id);

    return eventOwners;
  }
}

export default ListEventsAsOwnerService;
