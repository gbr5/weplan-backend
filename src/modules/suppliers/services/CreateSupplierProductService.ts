import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import SupplierProduct from '@modules/suppliers/infra/typeorm/entities/SupplierProduct';
import ISupplierProductRepository from '@modules/suppliers/repositories/ISupplierProductRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateSupplierProductDTO from '../dtos/ICreateSupplierProductDTO';

interface IRequest {
  user_id: string;
  sub_category_name: string;
}

@injectable()
class CreateSupplierProductService {
  constructor(
    @inject('SupplierProductRepository')
    private supplierProductRepository: ISupplierProductRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    sub_category_id,
    event_type_id,
    price,
  }: ICreateSupplierProductDTO): Promise<SupplierProduct> {
    try {
      const product = await this.supplierProductRepository.findBySupplierAndCategoryAndEventTypeId(
        user_id,
        sub_category_id,
        event_type_id,
      );

      if (product) {
        throw new AppError(`error`);
      }

      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not found');
      }

      const supplierProduct = await this.supplierProductRepository.create({
        user_id,
        sub_category_id,
        event_type_id,
        price,
      });

      return supplierProduct;
    } catch (err) {
      throw new AppError('Somthing went wrong - CreateSupplierProductService');
    }
  }
}

export default CreateSupplierProductService;
