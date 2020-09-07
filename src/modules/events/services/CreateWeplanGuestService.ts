import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import WeplanGuest from '@modules/events/infra/typeorm/entities/WeplanGuest';
import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  user_id: string;
  guest_id: string;
  event_id: string;
}

@injectable()
class CreateWeplanGuestService {
  constructor(
    @inject('WeplanGuestsRepository')
    private guestsRepository: IWeplanGuestsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    guest_id,
    event_id,
  }: IRequest): Promise<WeplanGuest> {
    const guestExists = await this.guestsRepository.findByEventAndUserId(
      event_id,
      user_id,
    );

    if (guestExists) {
      throw new AppError('The guest that you have chosen, already exists.');
    }

    const guest = await this.guestsRepository.create({
      user_id,
      guest_id,
      event_id,
    });

    return guest;
  }
}

export default CreateWeplanGuestService;
