import { injectable, inject } from 'tsyringe';
import { differenceInMilliseconds } from 'date-fns';

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
    const eOwners = await this.eventOwnersRepository.findByOwnerId(user_id);

    const nextEvents: Event[] = [];

    eMembers
      .filter(
        member =>
          differenceInMilliseconds(new Date(member.event.date), today) > 0,
      )
      .map(e => nextEvents.push(e.event));
    eOwners
      .filter(
        owner =>
          differenceInMilliseconds(new Date(owner.event.date), today) > 0,
      )
      .map(e => nextEvents.push(e.event));

    const event = nextEvents.sort((a, b) => {
      if (differenceInMilliseconds(new Date(a.date), new Date(b.date)) < 0) {
        return -1;
      }
      if (differenceInMilliseconds(new Date(a.date), new Date(b.date)) > 0) {
        return 1;
      }
      return 0;
    })[0];

    if (!event) {
      throw new AppError('Event not found');
    }

    return event;
  }
}

export default ShowMyNextEventService;
