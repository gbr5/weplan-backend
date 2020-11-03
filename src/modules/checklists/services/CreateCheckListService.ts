import { injectable, inject } from 'tsyringe';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import ICheckListsRepository from '@modules/checklists/repositories/ICheckListsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateCheckListDTO from '../dtos/ICreateCheckListDTO';

@injectable()
class CreateCheckListService {
  constructor(
    @inject('CheckListsRepository')
    private checkListsRepository: ICheckListsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(data: ICreateCheckListDTO): Promise<CheckList> {
    const checkList = await this.checkListsRepository.create(data);

    return checkList;
  }
}

export default CreateCheckListService;
