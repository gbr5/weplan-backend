import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import EventMember from '../infra/typeorm/entities/EventMember';

@injectable()
class ListEventMembersService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,
  ) {}

  public async execute(event_id: string): Promise<EventMember[]> {
    const eventMembers = await this.eventMembersRepository.findByEvent(
      event_id,
    );

    return eventMembers;
  }
}

export default ListEventMembersService;
