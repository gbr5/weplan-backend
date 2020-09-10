import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';

import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';

@injectable()
class UpdateEventOwnerService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,
  ) {}

  public async execute(
    id: string,
    number_of_guests: number,
    description: string,
  ): Promise<EventOwner> {
    const eventOwner = await this.eventOwnersRepository.findById(id);

    if (!eventOwner) {
      throw new AppError('Event informations not found.');
    }

    eventOwner.number_of_guests = number_of_guests;
    eventOwner.description = description;

    const updatedEventOwner = await this.eventOwnersRepository.save(eventOwner);

    return updatedEventOwner;
  }
}

export default UpdateEventOwnerService;
