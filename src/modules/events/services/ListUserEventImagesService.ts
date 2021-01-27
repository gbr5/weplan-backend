import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IListUserEventImageDTO from '../dtos/IListUserEventImageDTO';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class ListUserEventImagesService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<IListUserEventImageDTO[]> {
    const events = await this.eventsRepository.findByUserId(user_id);
    const eventImages: IListUserEventImageDTO[] = [];

    events
      .filter(event => event.eventImages.length >= 1)
      .map(xEvent => {
        xEvent.eventImages.map(eventImage => {
          const image_url = eventImage.image.getAvatarUrl();
          eventImages.push({
            ...eventImage,
            event: xEvent,
            image_url: image_url || '',
          });
          return eventImage;
        });
        return xEvent;
      });

    return eventImages;
  }
}

export default ListUserEventImagesService;
