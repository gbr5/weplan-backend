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
    // const users = ([] as unknown) as Promise<IEventMemberDTO[]>;

    // EventMembers.map(async member => {
    //   (await users).push({
    //     id: member.member_id,
    //     name: member.userEventMember.name,
    //     avatar: member.userEventMember.avatar
    //       ? member.userEventMember.avatar
    //       : '',
    //     number_of_guests: member.number_of_guests,
    //   });
    // });

    return eventMembers;
  }
}

export default ListEventMembersService;
