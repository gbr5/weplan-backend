import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import EventMember from '../infra/typeorm/entities/EventMember';

@injectable()
class ListEventsAsMemberService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,
  ) {}

  public async execute(user_id: string): Promise<EventMember[]> {
    const eventMembers = await this.eventMembersRepository.findByMemberId(
      user_id,
    );

    return eventMembers;
  }
}

export default ListEventsAsMemberService;
