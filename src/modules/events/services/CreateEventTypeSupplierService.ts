import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventTypeSupplier from '@modules/events/infra/typeorm/entities/EventTypeSupplier';
import IEventTypeSuppliersRepository from '@modules/events/repositories/IEventTypeSuppliersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  event_type: string;
}

@injectable()
class CreateEventTypeSupplierService {
  constructor(
    @inject('EventTypeSuppliersRepository')
    private eventTypeSuppliersRepository: IEventTypeSuppliersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    event_type,
  }: IRequest): Promise<EventTypeSupplier> {
    try {
      const eventTypeSupplierExists = await this.eventTypeSuppliersRepository.findByIdAndEventType(
        user_id,
        event_type,
      );

      if (eventTypeSupplierExists) {
        throw new AppError(
          `${user_id} is already registered to ${event_type}.`,
        );
      }

      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not found');
      }

      const eventTypeSupplier = await this.eventTypeSuppliersRepository.create({
        user_id,
        event_type,
      });

      await this.notificationsRepository.create({
        recipient_id: user_id,
        content: `${user_id} was successfully registered for ${event_type}.`,
      });

      return eventTypeSupplier;
    } catch (err) {
      throw new AppError(
        'Somthing went wrong - CreateEventTypeSupplierService',
      );
    }
  }
}

export default CreateEventTypeSupplierService;
