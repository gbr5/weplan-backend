import { injectable, inject } from 'tsyringe';

import WeplanContractOrder from '@modules/weplan/infra/typeorm/entities/WeplanContractOrder';
import IWeplanContractOrdersRepository from '@modules/weplan/repositories/IWeplanContractOrdersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateWeplanContractOrderDTO from '../dtos/ICreateWeplanContractOrderDTO';

@injectable()
class CreateWeplanContractOrdersService {
  constructor(
    @inject('WeplanContractOrdersRepository')
    private weplanContractOrdersRepository: IWeplanContractOrdersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
  }: ICreateWeplanContractOrderDTO): Promise<WeplanContractOrder> {
    const contractOrder = await this.weplanContractOrdersRepository.create({
      user_id,
    });

    return contractOrder;
  }
}

export default CreateWeplanContractOrdersService;
