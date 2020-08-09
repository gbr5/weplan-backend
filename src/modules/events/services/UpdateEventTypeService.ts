import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTypesRepository from '@modules/events/repositories/IEventTypesRepository';

import EventType from '@modules/events/infra/typeorm/entities/EventType';

interface IRequest {
  name: string;
}
@injectable()
class UpdateEventTypesService {
  constructor(
    @inject('EventTypesRepository')
    private eventTypesRepository: IEventTypesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<EventType> {
    const eventTypes = await this.eventTypesRepository.findByName(name);

    if (!eventTypes) {
      throw new AppError('EventTypes not found.');
    }
    eventTypes.name = name;

    const updatedEventTypes = await this.eventTypesRepository.save(eventTypes);

    return updatedEventTypes;
  }
}

export default UpdateEventTypesService;
