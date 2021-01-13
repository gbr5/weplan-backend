import { injectable, inject } from 'tsyringe';

import EventImage from '@modules/events/infra/typeorm/entities/EventImage';
import IEventImagesRepository from '@modules/events/repositories/IEventImagesRepository';
import ICreateEventImageDTO from '@modules/events/dtos/ICreateEventImageDTO';
import AppError from '@shared/errors/AppError';
import IUserImagesRepository from '@modules/users/repositories/IUserImagesRepository';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class CreateEventImageService {
  constructor(
    @inject('EventImagesRepository')
    private eventImagesRepository: IEventImagesRepository,

    @inject('UserImagesRepository')
    private userImagesRepository: IUserImagesRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    event_id,
    image_id,
  }: ICreateEventImageDTO): Promise<EventImage> {
    const image = await this.userImagesRepository.findById(image_id);

    if (!image) {
      throw new AppError('Image not found!');
    }

    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found!');
    }

    const eventImage = await this.eventImagesRepository.create({
      image_id,
      event_id,
    });

    return eventImage;
  }
}

export default CreateEventImageService;
