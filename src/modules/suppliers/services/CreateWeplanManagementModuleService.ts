import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import WeplanManagementModule from '@modules/suppliers/infra/typeorm/entities/WeplanManagementModule';
import IWeplanManagementModulesRepository from '@modules/suppliers/repositories/IWeplanManagementModulesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateWeplanManagementModulesService {
  constructor(
    @inject('WeplanManagementModulesRepository')
    private weplanManagementModulesRepository: IWeplanManagementModulesRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(name: string): Promise<WeplanManagementModule> {
    const findModule = await this.weplanManagementModulesRepository.findByName(
      name,
    );

    if (findModule) {
      throw new AppError('This module already exists.');
    }

    const weplanManagementModule = await this.weplanManagementModulesRepository.create(
      {
        name,
      },
    );

    return weplanManagementModule;
  }
}

export default CreateWeplanManagementModulesService;
