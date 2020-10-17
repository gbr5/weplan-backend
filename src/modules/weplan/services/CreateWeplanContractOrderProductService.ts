import { injectable, inject } from 'tsyringe';

import WeplanContractOrderProduct from '@modules/weplan/infra/typeorm/entities/WeplanContractOrderProduct';
import IWeplanContractOrderProductsRepository from '@modules/weplan/repositories/IWeplanContractOrderProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateWeplanContractOrderProductDTO from '../dtos/ICreateWeplanContractOrderProductDTO';

@injectable()
class CreateWeplanContractOrderProductsService {
  constructor(
    @inject('WeplanContractOrderProductsRepository')
    private weplanContractOrdersRepository: IWeplanContractOrderProductsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    contract_order_id,
    weplan_product_id,
    price,
    quantity,
  }: ICreateWeplanContractOrderProductDTO): Promise<
    WeplanContractOrderProduct
  > {
    const contractOrder = await this.weplanContractOrdersRepository.create({
      contract_order_id,
      weplan_product_id,
      price,
      quantity,
    });

    return contractOrder;
  }
}

export default CreateWeplanContractOrderProductsService;
