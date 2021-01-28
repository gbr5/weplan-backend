import { injectable, inject } from 'tsyringe';

import EventInspirationImage from '@modules/events/infra/typeorm/entities/EventInspirationImage';
import IEventInspirationImagesRepository from '@modules/events/repositories/IEventInspirationImagesRepository';
import ICreateEventInspirationImageDTO from '@modules/events/dtos/ICreateEventInspirationImageDTO';
import AppError from '@shared/errors/AppError';
import IInspirationImagesRepository from '@modules/users/repositories/IInspirationImagesRepository';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class CreateEventInspirationImageService {
  constructor(
    @inject('EventInspirationImagesRepository')
    private eventImagesRepository: IEventInspirationImagesRepository,

    @inject('InspirationImagesRepository')
    private inspirationImagesRepository: IInspirationImagesRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    event_id,
    inspiration_image_id,
  }: ICreateEventInspirationImageDTO): Promise<EventInspirationImage> {
    const image = await this.inspirationImagesRepository.findById(
      inspiration_image_id,
    );

    if (!image) {
      throw new AppError('Image not found!');
    }

    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found!');
    }

    const eventImage = await this.eventImagesRepository.create({
      inspiration_image_id,
      event_id,
    });

    return eventImage;
  }
}

export default CreateEventInspirationImageService;
