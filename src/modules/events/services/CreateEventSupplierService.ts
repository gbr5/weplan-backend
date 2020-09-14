import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  name: string;
  event_id: string;
  supplier_sub_category: string;
  isHired: boolean;
  weplanUser: boolean;
  user_id: string;
}

@injectable()
class CreateEventSupplierService {
  constructor(
    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSuppliersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    event_id,
    supplier_sub_category,
    isHired,
    weplanUser,
    user_id,
  }: IRequest): Promise<EventSupplier> {
    const eventSupplierExists = await this.eventSuppliersRepository.findByNameAndEvent(
      name,
      event_id,
    );

    if (eventSupplierExists) {
      throw new AppError(
        'The supplier that you have chosen, is already selected.',
      );
    }

    const event = await this.eventSuppliersRepository.create({
      name,
      event_id,
      supplier_sub_category,
      isHired,
      weplanUser,
    });

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: `${name} adicionado!.`,
    });

    return event;
  }
}

export default CreateEventSupplierService;
