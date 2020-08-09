import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';
import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  supplier_id: string;
  event_name: string;
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
    event_name,
    supplier_id,
  }: IRequest): Promise<EventSupplier> {
    const eventSupplierExists = await this.eventSuppliersRepository.findByIdAndEvent(
      {
        event_name,
        supplier_id,
      },
    );

    if (eventSupplierExists) {
      throw new AppError(
        'The event name that you have chosen, already exists.',
      );
    }

    const event = await this.eventSuppliersRepository.create({
      event_name,
      supplier_id,
    });

    await this.notificationsRepository.create({
      recipient_id: supplier_id,
      content: `${supplier_id} adicionado ao ${event_name}.`,
    });

    return event;
  }
}

export default CreateEventSupplierService;
