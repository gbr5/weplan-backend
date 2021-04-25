import { injectable, inject } from 'tsyringe';

import CardCheckList from '@modules/checklists/infra/typeorm/entities/CardCheckList';
import ICardCheckListsRepository from '@modules/checklists/repositories/ICardCheckListsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import AppError from '@shared/errors/AppError';
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
    const findCardCheckList = await this.cardCheckListsRepository.findByCardUniqueName(
      data.card_unique_name,
    );

    if (findCardCheckList) {
      throw new AppError(
        'This card already have a check list associated with it',
      );
    }
    const cardCheckList = await this.cardCheckListsRepository.create(data);

    return cardCheckList;
  }
}

export default CreateCardCheckListService;
