import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventFilesRepository from '@modules/events/repositories/IEventFilesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventFileDTO from '../dtos/ICreateEventFileDTO';

@injectable()
class ListEventFilesService {
  constructor(
    @inject('EventFilesRepository')
    private eventFilesRepository: IEventFilesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IEventFileDTO[]> {
    const eventFiles = await this.eventFilesRepository.findByEvent(event_id);

    return eventFiles;
  }
}

export default ListEventFilesService;
