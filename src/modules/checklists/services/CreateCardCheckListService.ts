import { injectable, inject } from 'tsyringe';

import CardCheckList from '@modules/checklists/infra/typeorm/entities/CardCheckList';
import ICardCheckListsRepository from '@modules/checklists/repositories/ICardCheckListsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateCardCheckListDTO from '../dtos/ICreateCardCheckListDTO';

@injectable()
class CreateCardCheckListService {
  constructor(
    @inject('CardCheckListsRepository')
    private cardCheckListsRepository: ICardCheckListsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(data: ICreateCardCheckListDTO): Promise<CardCheckList> {
    const cardCheckList = await this.cardCheckListsRepository.create(data);

    return cardCheckList;
  }
}

export default CreateCardCheckListService;
