import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventTypeSupplier from '@modules/events/infra/typeorm/entities/EventTypeSupplier';
import IEventTypeSuppliersRepository from '@modules/events/repositories/IEventTypeSuppliersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  user_id: string;
  event_type: string;
}

@injectable()
class CreateEventTypeSupplierService {
  constructor(
    @inject('EventTypeSuppliersRepository')
    private eventTypeSuppliersRepository: IEventTypeSuppliersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    event_type,
  }: IRequest): Promise<EventTypeSupplier> {
    const eventTypeSupplierExists = await this.eventTypeSuppliersRepository.findByIdAndEventType(
      {
        user_id,
        event_type,
      },
    );

    if (eventTypeSupplierExists) {
      throw new AppError(
        `The supplier is already registered to ${event_type}.`,
      );
    }
    console.log(
      'teste - CreateEventTypeSupplier service',
      event_type,
      user_id,
      eventTypeSupplierExists,
    );

    const eventTypeSupplier = await this.eventTypeSuppliersRepository.create({
      user_id,
      event_type,
    });
    console.log('teste - createEventTypeSupplier', eventTypeSupplier);

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: `${user_id} foi cadastrado para o tipo de evento ${event_type} com sucesso`,
    });

    return eventTypeSupplier;
  }
}

export default CreateEventTypeSupplierService;
