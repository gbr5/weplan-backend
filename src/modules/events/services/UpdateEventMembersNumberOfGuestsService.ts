import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';

import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  event_id: string;
  number_of_guests: number;
}
@injectable()
class UpdateEventMembersNumberOfGuestsService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    event_id,
    number_of_guests,
  }: IRequest): Promise<void> {
    const events = await this.eventsRepository.findById(event_id);
    if (events) {
      throw new AppError('Event not found.');
    }
    const eventMembers = await this.eventMembersRepository.findByEvent(
      event_id,
    );

    const newMembers = eventMembers.map(member => {
      return {
        ...member,
        number_of_guests,
      };
    });

    Promise.all([
      newMembers.map(member => {
        return this.eventMembersRepository.save(member);
      }),
    ]);
  }
}

export default UpdateEventMembersNumberOfGuestsService;
