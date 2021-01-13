import { getRepository, Repository } from 'typeorm';

import IEventFilesRepository from '@modules/events/repositories/IEventFilesRepository';
import ICreateEventFileDTO from '@modules/events/dtos/ICreateEventFileDTO';
import EventFile from '@modules/events/infra/typeorm/entities/EventFile';

class EventFilesRepository implements IEventFilesRepository {
  private ormRepository: Repository<EventFile>;

  constructor() {
    this.ormRepository = getRepository(EventFile);
  }

  public async findByEvent(event_id: string): Promise<EventFile[]> {
    const findEventFile = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventFile;
  }

  public async findById(id: string): Promise<EventFile | undefined> {
    const findEventFile = await this.ormRepository.findOne(id);

    return findEventFile;
  }

  public async create(data: ICreateEventFileDTO): Promise<EventFile> {
    const eventFile = this.ormRepository.create(data);

    await this.ormRepository.save(eventFile);

    return eventFile;
  }

  public async save(eventFile: EventFile): Promise<EventFile> {
    return this.ormRepository.save(eventFile);
  }

  public async delete({ id }: EventFile): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default EventFilesRepository;
