import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import Event from '@modules/events/infra/typeorm/entities/Event';

interface IRequest {
  event_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateEventAvatarService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ event_id, avatarFilename }: IRequest): Promise<Event> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Only authenticated events can change avatar.', 401);
    }

    if (event.avatar) {
      await this.storageProvider.deleteFile(event.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    event.avatar = fileName;

    // if (event.password) {
    //   delete event.password;
    // }
    await this.eventsRepository.save(event);

    return event;
  }
}

export default UpdateEventAvatarService;
