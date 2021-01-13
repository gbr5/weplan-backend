import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventImagesRepository from '@modules/events/repositories/IEventImagesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventImageDTO from '../dtos/ICreateEventImageDTO';

@injectable()
class ListEventImagesService {
  constructor(
    @inject('EventImagesRepository')
    private eventImagesRepository: IEventImagesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IEventImageDTO[]> {
    const eventImages = await this.eventImagesRepository.findByEvent(event_id);

    return eventImages;
  }
}

export default ListEventImagesService;
