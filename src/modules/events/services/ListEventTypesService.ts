import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventType from '@modules/events/infra/typeorm/entities/EventType';
import IEventTypesRepository from '@modules/events/repositories/IEventTypesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserEventTypesService {
  constructor(
    @inject('EventTypesRepository')
    private eventTypesRepository: IEventTypesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(): Promise<EventType[]> {
    const eventTypes = await this.eventTypesRepository.findAll();

    return eventTypes;
  }
}

export default ListUserEventTypesService;
