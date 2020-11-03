import { injectable, inject } from 'tsyringe';

import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import ICheckListTasksRepository from '@modules/checklists/repositories/ICheckListTasksRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateCheckListTaskDTO from '../dtos/ICreateCheckListTaskDTO';

@injectable()
class CreateCheckListTaskTaskService {
  constructor(
    @inject('CheckListTasksRepository')
    private checkListTasksRepository: ICheckListTasksRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(data: ICreateCheckListTaskDTO): Promise<CheckListTask> {
    const checkListTask = await this.checkListTasksRepository.create(data);

    return checkListTask;
  }
}

export default CreateCheckListTaskTaskService;
