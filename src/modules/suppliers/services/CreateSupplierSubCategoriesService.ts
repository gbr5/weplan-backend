import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import SupplierSubCategory from '@modules/suppliers/infra/typeorm/entities/SupplierSubCategory';
import ISupplierSubCategoriesRepository from '@modules/suppliers/repositories/ISupplierSubCategoriesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

@injectable()
class CreateSupplierSubCategoriesService {
  constructor(
    @inject('SupplierSubCategoriesRepository')
    private supplierSubCategoriesRepository: ISupplierSubCategoriesRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    category: string,
    sub_category: string,
  ): Promise<SupplierSubCategory> {
    const eventNameExists = await this.supplierSubCategoriesRepository.findBySubCategoryName(
      sub_category,
    );

    if (eventNameExists) {
      throw new AppError(
        'The sub-category that you have chosen, already exists.',
      );
    }

    const supplierCategory = await this.supplierSubCategoriesRepository.create({
      category,
      sub_category,
    });

    return supplierCategory;
  }
}

export default CreateSupplierSubCategoriesService;
