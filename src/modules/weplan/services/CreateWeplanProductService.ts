import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import WeplanProduct from '@modules/weplan/infra/typeorm/entities/WeplanProduct';
import IWeplanProductsRepository from '@modules/weplan/repositories/IWeplanProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateWeplanProductDTO from '../dtos/ICreateWeplanProductDTO';

@injectable()
class CreateWeplanProductsService {
  constructor(
    @inject('WeplanProductsRepository')
    private weplanManagementModulesRepository: IWeplanProductsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    target_audience,
    price,
  }: ICreateWeplanProductDTO): Promise<WeplanProduct> {
    const findModule = await this.weplanManagementModulesRepository.findByName(
      name,
    );

    if (findModule) {
      throw new AppError('This module already exists.');
    }

    const weplanManagementModule = await this.weplanManagementModulesRepository.create(
      {
        name,
        target_audience,
        price,
      },
    );

    return weplanManagementModule;
  }
}

export default CreateWeplanProductsService;
