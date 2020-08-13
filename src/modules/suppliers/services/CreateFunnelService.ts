import { injectable, inject } from 'tsyringe';

import Funnel from '@modules/suppliers/infra/typeorm/entities/Funnel';
import IFunnelsRepository from '@modules/suppliers/repositories/IFunnelsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

@injectable()
class CreateFunnelService {
  constructor(
    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    name: string,
    supplier_id: string,
    funnel_type: string,
  ): Promise<Funnel> {
    const funnel = await this.funnelsRepository.create({
      name,
      supplier_id,
      funnel_type,
    });

    return funnel;
  }
}

export default CreateFunnelService;
