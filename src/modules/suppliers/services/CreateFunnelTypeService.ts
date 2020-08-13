import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import FunnelType from '@modules/suppliers/infra/typeorm/entities/FunnelType';
import IFunnelTypesRepository from '@modules/suppliers/repositories/IFunnelTypesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateFunnelTypesService {
  constructor(
    @inject('FunnelTypesRepository')
    private funnelTypesRepository: IFunnelTypesRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<FunnelType> {
    const eventNameExists = await this.funnelTypesRepository.findByName(name);

    if (eventNameExists) {
      throw new AppError(
        'The event type that you have chosen, already exists.',
      );
    }

    const funnelType = await this.funnelTypesRepository.create({
      name,
    });

    return funnelType;
  }
}

export default CreateFunnelTypesService;
