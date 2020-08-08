import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Event from '@modules/events/infra/typeorm/entities/Event';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Event[]> {
    // const cacheKey = `user-events:${user_id}:${year}-${month}-${day}`;

    // let events = await this.cacheUser.recover<Event[]>(cacheKey);

    // if (!events) {
    const events = await this.eventsRepository.findByUserId(user_id);

    //   await this.cacheUser.save(cacheKey, classToClass(events));
    // }

    return events;
  }
}

export default ListUserEventService;
