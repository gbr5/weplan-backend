import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventWeplanSupplier from '@modules/events/infra/typeorm/entities/EventWeplanSupplier';
import IEventWeplanSuppliersRepository from '@modules/events/repositories/IEventWeplanSuppliersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  user_id: string;
  event_supplier_id: string;
  event_id: string;
  my_id: string;
}

@injectable()
class CreateEventWeplanSupplierService {
  constructor(
    @inject('EventWeplanSuppliersRepository')
    private eventSuppliersRepository: IEventWeplanSuppliersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    event_supplier_id,
    event_id,
    my_id,
  }: IRequest): Promise<EventWeplanSupplier> {
    const eventSupplierExists = await this.eventSuppliersRepository.findByEventAndEventSupplierId(
      event_supplier_id,
      event_id,
    );

    if (eventSupplierExists) {
      throw new AppError(
        'The supplier that you have chosen, is already selected.',
      );
    }

    const event = await this.eventSuppliersRepository.create({
      user_id,
      event_id,
      event_supplier_id,
    });

    // await this.notificationsRepository.create({
    //   recipient_id: user_id,
    //   content: `${name} adicionado!.`,
    // });

    return event;
  }
}

export default CreateEventWeplanSupplierService;
