import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventInspirationImagesRepository from '@modules/events/repositories/IEventInspirationImagesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import EventInspirationImage from '@modules/events/infra/typeorm/entities/EventInspirationImage';

@injectable()
class ListEventInspirationImagesService {
  constructor(
    @inject('EventInspirationImagesRepository')
    private eventInspirationImagesRepository: IEventInspirationImagesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<EventInspirationImage[]> {
    const eventInspirationImages = await this.eventInspirationImagesRepository.findByEvent(
      event_id,
    );

    return eventInspirationImages;
  }
}

export default ListEventInspirationImagesService;
