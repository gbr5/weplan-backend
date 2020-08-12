import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventMember from '@modules/events/infra/typeorm/entities/EventMember';
import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventMembersService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_name: string): Promise<EventMember[]> {
    const EventMembers = await this.eventMembersRepository.findByEvent(
      event_name,
    );

    return EventMembers;
  }
}

export default ListEventMembersService;
