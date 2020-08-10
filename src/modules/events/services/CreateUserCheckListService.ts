import { injectable, inject } from 'tsyringe';

import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';
import IUserCheckListsRepository from '@modules/events/repositories/IUserCheckListsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  name: string;
  priority_level: number;
  checked: boolean;
  event_name: string;
}

@injectable()
class CreateUserCheckListService {
  constructor(
    @inject('UserCheckListsRepository')
    private userCheckListsRepository: IUserCheckListsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    priority_level,
    checked,
    event_name,
  }: IRequest): Promise<UserCheckList> {
    const checkList = await this.userCheckListsRepository.create({
      name,
      priority_level,
      checked,
      event_name,
    });

    return checkList;
  }
}

export default CreateUserCheckListService;
