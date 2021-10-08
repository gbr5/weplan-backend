import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';

import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  event_id: string;
  number_of_guests: number;
}
@injectable()
class UpdateEventOwnersNumberOfGuestsService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

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
    const eventOwners = await this.eventOwnersRepository.findByEvent(event_id);

    const newOwners = eventOwners.map(owner => {
      return {
        ...owner,
        number_of_guests,
      };
    });

    Promise.all([
      newOwners.map(owner => {
        return this.eventOwnersRepository.save(owner);
      }),
    ]);
  }
}

export default UpdateEventOwnersNumberOfGuestsService;
