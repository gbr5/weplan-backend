import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventOwnersRepository from '../repositories/IEventOwnersRepository';
import IEventMembersRepository from '../repositories/IEventMembersRepository';
import IListUserEvent from '../dtos/IListUserEvent';
import IWeplanGuestsRepository from '../repositories/IWeplanGuestsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserEventService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IListUserEvent[]> {
    const owner_id = user_id;
    const member_id = user_id;
    const eventsAsOwner = await this.eventOwnersRepository.findByOwnerId(
      owner_id,
    );
    const eventsAsMember = await this.eventMembersRepository.findByMemberId(
      member_id,
    );
    const eventsAsGuest = await this.weplanGuestsRepository.findByUserId(
      user_id,
    );

    const userEvents = [{} as IListUserEvent];

    eventsAsOwner.map(owner => {
      const event_avatar_url = owner.event.getAvatarUrl();
      const userEventOwner = {
        id: owner.event.id,
        userEvent_id: owner.owner_id,
        name: owner.event.name,
        trimmed_name: owner.event.trimmed_name,
        number_of_guests: owner.number_of_guests,
        isOwner: true,
        owner_master: owner.event.user_id,
        isGuest: false,
        event_type: owner.event.event_type,
        date: owner.event.date,
        isDateDefined: owner.event.isDateDefined,
        isPublished: owner.event.isPublished,
        event_avatar_url: event_avatar_url || 'n/a',
      };
      userEvents.push(userEventOwner);

      return userEventOwner;
    });
    eventsAsMember.map(member => {
      const event_avatar_url = member.event.getAvatarUrl();
      const userEventMember = {
        id: member.event.id,
        userEvent_id: member.member_id,
        name: member.event.name,
        trimmed_name: member.event.trimmed_name,
        number_of_guests: member.number_of_guests,
        isOwner: false,
        owner_master: member.event.user_id,
        isGuest: false,
        event_type: member.event.event_type,
        date: member.event.date,
        isDateDefined: member.event.isDateDefined,
        isPublished: member.event.isPublished,
        event_avatar_url: event_avatar_url || 'n/a',
      };
      userEvents.push(userEventMember);

      return userEventMember;
    });
    eventsAsGuest.map(guest => {
      const event_avatar_url = guest.event.getAvatarUrl();
      const userEventGuest = {
        id: guest.event.id,
        userEvent_id: guest.user_id,
        name: guest.event.name,
        trimmed_name: guest.event.trimmed_name,
        number_of_guests: 0,
        isOwner: false,
        owner_master: guest.event.user_id,
        isGuest: false,
        event_type: guest.event.event_type,
        date: guest.event.date,
        isDateDefined: guest.event.isDateDefined,
        isPublished: guest.event.isPublished,
        event_avatar_url: event_avatar_url || 'n/a',
      };
      userEvents.push(userEventGuest);

      return userEventGuest;
    });

    return userEvents;
  }
}

export default ListUserEventService;
