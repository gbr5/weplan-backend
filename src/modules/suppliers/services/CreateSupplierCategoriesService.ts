import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import SupplierCategory from '@modules/suppliers/infra/typeorm/entities/SupplierCategory';
import ISupplierCategoriesRepository from '@modules/suppliers/repositories/ISupplierCategoriesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

@injectable()
class CreateSupplierCategoriesService {
  constructor(
    @inject('SupplierCategoriesRepository')
    private supplierCategoriesRepository: ISupplierCategoriesRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(category: string): Promise<SupplierCategory> {
    const eventNameExists = await this.supplierCategoriesRepository.findByCategoryName(
      category,
    );

    if (eventNameExists) {
      throw new AppError('The category that you have chosen, already exists.');
    }

    const supplierCategory = await this.supplierCategoriesRepository.create({
      category,
    });

    return supplierCategory;
  }
}

export default CreateSupplierCategoriesService;
