import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';

import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';

interface IRequest {
  id: string;
  description: string;
  number_of_guests: number;
}
@injectable()
class UpdateEventOwnerService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,
  ) {}

  public async execute({
    id,
    description,
    number_of_guests,
  }: IRequest): Promise<EventOwner> {
    const eventOwner = await this.eventOwnersRepository.findById(id);

    if (!eventOwner) {
      throw new AppError('Event informations not found.');
    }

    eventOwner.description = description;
    eventOwner.number_of_guests = number_of_guests;

    const updatedEventOwner = await this.eventOwnersRepository.save(eventOwner);

    return updatedEventOwner;
  }
}

export default UpdateEventOwnerService;
