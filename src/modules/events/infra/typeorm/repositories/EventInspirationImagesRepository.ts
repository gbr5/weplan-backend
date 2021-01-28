import { getRepository, Repository } from 'typeorm';

import IEventInspirationImagesRepository from '@modules/events/repositories/IEventInspirationImagesRepository';
import ICreateEventInspirationImageDTO from '@modules/events/dtos/ICreateEventInspirationImageDTO';
import EventInspirationImage from '@modules/events/infra/typeorm/entities/EventInspirationImage';

class EventInspirationImagesRepository
  implements IEventInspirationImagesRepository {
  private ormRepository: Repository<EventInspirationImage>;

  constructor() {
    this.ormRepository = getRepository(EventInspirationImage);
  }

  public async findByEvent(event_id: string): Promise<EventInspirationImage[]> {
    const findEventInspirationImage = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventInspirationImage;
  }

  public async findById(
    id: string,
  ): Promise<EventInspirationImage | undefined> {
    const findEventInspirationImage = await this.ormRepository.findOne(id);

    return findEventInspirationImage;
  }

  public async create(
    data: ICreateEventInspirationImageDTO,
  ): Promise<EventInspirationImage> {
    const eventInspirationImage = this.ormRepository.create(data);

    await this.ormRepository.save(eventInspirationImage);

    return eventInspirationImage;
  }

  public async save(
    eventInspirationImage: EventInspirationImage,
  ): Promise<EventInspirationImage> {
    return this.ormRepository.save(eventInspirationImage);
  }

  public async delete({ id }: EventInspirationImage): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default EventInspirationImagesRepository;
