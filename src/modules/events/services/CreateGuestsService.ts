import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Guest from '@modules/events/infra/typeorm/entities/Guest';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  first_name: string;
  last_name: string;
  description: string;
  event_id: string;
  host_id: string;
  confirmed: boolean;
  weplanUser: boolean;
}

@injectable()
class CreateGuestService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    first_name,
    last_name,
    event_id,
    description,
    host_id,
    confirmed,
    weplanUser,
  }: IRequest): Promise<Guest> {
    const guestExists = await this.guestsRepository.findByEventFirstNameAndLastName(
      event_id,
      first_name,
      last_name,
    );

    if (guestExists) {
      throw new AppError('The guest that you have chosen, already exists.');
    }

    const guest = await this.guestsRepository.create({
      first_name,
      last_name,
      description,
      event_id,
      host_id,
      confirmed,
      weplanUser,
    });

    await this.notificationsRepository.create({
      recipient_id: host_id,
      content: `O convidado ${first_name} ${last_name} foi adicionado com sucesso.`,
    });

    return guest;
  }
}

export default CreateGuestService;
