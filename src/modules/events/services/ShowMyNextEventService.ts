import { injectable, inject } from 'tsyringe';
import { differenceInDays } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Event from '@modules/events/infra/typeorm/entities/Event';
import IEventOwnersRepository from '../repositories/IEventOwnersRepository';
import IEventMembersRepository from '../repositories/IEventMembersRepository';

@injectable()
class ShowMyNextEventService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,
  ) {}

  public async execute(user_id: string): Promise<Event> {
    const today = new Date();
    const eMembers = await this.eventMembersRepository.findByMemberId(user_id);
    const eventMembers = eMembers.filter(
      member => differenceInDays(new Date(member.event.date), today) > 0,
    );

    const eOwners = await this.eventOwnersRepository.findByOwnerId(user_id);
    const eventOwners = eOwners.filter(
      owner => differenceInDays(new Date(owner.event.date), today) > 0,
    );

    const nextEvents: Event[] = [];

    const nextOwnerEvent = eventOwners
      .sort((a, b) => {
        if (
          differenceInDays(new Date(a.event.date), new Date(b.event.date)) < 0
        ) {
          return -1;
        }
        if (
          differenceInDays(new Date(a.event.date), new Date(b.event.date)) > 0
        ) {
          return 1;
        }
        return 0;
      })
      .find(e => e);

    const nextMemberEvent = eventMembers
      .sort((a, b) => {
        if (
          differenceInDays(new Date(a.event.date), new Date(b.event.date)) < 0
        ) {
          return -1;
        }
        if (
          differenceInDays(new Date(a.event.date), new Date(b.event.date)) > 0
        ) {
          return 1;
        }
        return 0;
      })
      .find(e => e);

    if (!nextMemberEvent && nextOwnerEvent) {
      nextEvents.push(nextOwnerEvent.event);
    }

    if (nextMemberEvent && !nextOwnerEvent) {
      nextEvents.push(nextMemberEvent.event);
    }

    if (nextMemberEvent && nextOwnerEvent) {
      if (
        differenceInDays(
          new Date(nextOwnerEvent.event.date),
          new Date(nextMemberEvent.event.date),
        ) < 0
      ) {
        nextEvents.push(nextOwnerEvent.event);
      }
      if (
        differenceInDays(
          new Date(nextOwnerEvent.event.date),
          new Date(nextMemberEvent.event.date),
        ) > 0
      ) {
        nextEvents.push(nextMemberEvent.event);
      }
    }
    const event = nextEvents[0];

    if (!event) {
      throw new AppError('Event not found');
    }

    return event;
  }
}

export default ShowMyNextEventService;
