import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import EventMember from '../infra/typeorm/entities/EventMember';

@injectable()
class ListEventsAsMemberService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<EventMember[]> {
    const cacheKey = `events-as-member:${user_id}`;

    let eventsAsMember = await this.cacheProvider.recover<EventMember[]>(
      cacheKey,
    );

    if (!eventsAsMember) {
      eventsAsMember = await this.eventMembersRepository.findByMemberId(
        user_id,
      );

      await this.cacheProvider.save(cacheKey, classToClass(eventsAsMember));
    }

    return eventsAsMember;
  }
}

export default ListEventsAsMemberService;
