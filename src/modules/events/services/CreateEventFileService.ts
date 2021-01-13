import { injectable, inject } from 'tsyringe';

import EventFile from '@modules/events/infra/typeorm/entities/EventFile';
import IEventFilesRepository from '@modules/events/repositories/IEventFilesRepository';
import ICreateEventFileDTO from '@modules/events/dtos/ICreateEventFileDTO';
import AppError from '@shared/errors/AppError';
import IUserFilesRepository from '@modules/users/repositories/IUserFilesRepository';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class CreateEventFileService {
  constructor(
    @inject('EventFilesRepository')
    private eventFilesRepository: IEventFilesRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,
  ) {}

  public async execute({
    file_id,
    event_id,
  }: ICreateEventFileDTO): Promise<EventFile> {
    const userFile = await this.userFilesRepository.findById(file_id);

    if (!userFile) {
      throw new AppError('File not found!');
    }

    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found!');
    }

    const eventFile = await this.eventFilesRepository.create({
      file_id,
      event_id,
    });

    return eventFile;
  }
}

export default CreateEventFileService;
