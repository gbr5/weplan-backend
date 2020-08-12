import { injectable, inject } from 'tsyringe';

import EventInfo from '@modules/events/infra/typeorm/entities/EventInfo';
import IEventInfosRepository from '@modules/events/repositories/IEventInfosRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateEventInfoDTO from '@modules/events/dtos/ICreateEventInfoDTO';

@injectable()
class CreateEventInfoService {
  constructor(
    @inject('EventInfosRepository')
    private userCheckListsRepository: IEventInfosRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(data: ICreateEventInfoDTO): Promise<EventInfo> {
    const eventInfo = await this.userCheckListsRepository.create(data);

    return eventInfo;
  }
}

export default CreateEventInfoService;
