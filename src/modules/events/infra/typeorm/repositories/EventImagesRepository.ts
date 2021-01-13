import { getRepository, Repository } from 'typeorm';

import IEventImagesRepository from '@modules/events/repositories/IEventImagesRepository';
import ICreateEventImageDTO from '@modules/events/dtos/ICreateEventImageDTO';
import EventImage from '@modules/events/infra/typeorm/entities/EventImage';

class EventImagesRepository implements IEventImagesRepository {
  private ormRepository: Repository<EventImage>;

  constructor() {
    this.ormRepository = getRepository(EventImage);
  }

  public async findByEvent(event_id: string): Promise<EventImage[]> {
    const findEventImage = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventImage;
  }

  public async findById(id: string): Promise<EventImage | undefined> {
    const findEventImage = await this.ormRepository.findOne(id);

    return findEventImage;
  }

  public async create(data: ICreateEventImageDTO): Promise<EventImage> {
    const eventImage = this.ormRepository.create(data);

    await this.ormRepository.save(eventImage);

    return eventImage;
  }

  public async save(eventImage: EventImage): Promise<EventImage> {
    return this.ormRepository.save(eventImage);
  }

  public async delete({ id }: EventImage): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default EventImagesRepository;
