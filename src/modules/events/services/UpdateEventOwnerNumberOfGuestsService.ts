import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';

import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';

interface IRequest {
  owner_id: string;
  number_of_guests: number;
}
@injectable()
class UpdateEventOwnerNumberOfGuestsService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,
  ) {}

  public async execute({
    owner_id,
    number_of_guests,
  }: IRequest): Promise<EventOwner> {
    const eventOwner = await this.eventOwnersRepository.findById(owner_id);

    if (!eventOwner) {
      throw new AppError('Event owner not found.');
    }

    eventOwner.number_of_guests = number_of_guests;

    const updatedEventOwner = await this.eventOwnersRepository.save(eventOwner);

    return updatedEventOwner;
  }
}

export default UpdateEventOwnerNumberOfGuestsService;
