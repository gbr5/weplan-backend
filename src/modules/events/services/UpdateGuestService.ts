import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import Guest from '@modules/events/infra/typeorm/entities/Guest';

interface IRequest {
  first_name: string;
  new_first_name: string;
  last_name: string;
  new_last_name: string;
  description: string;
  event_id: string;
  host_id: string;
  confirmed: boolean;
  weplanUser: boolean;
}
@injectable()
class UpdateGuestService {
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
    new_first_name,
    last_name,
    new_last_name,
    description,
    event_id,
    host_id,
    confirmed,
    weplanUser,
  }: IRequest): Promise<Guest> {
    const guest = await this.guestsRepository.findByEventFirstNameAndLastName(
      event_id,
      first_name,
      last_name,
    );

    if (!guest) {
      throw new AppError('Guest not found.');
    }

    guest.first_name = new_first_name;
    guest.last_name = new_last_name;
    guest.description = description;
    guest.event_id = event_id;
    guest.host_id = host_id;
    guest.confirmed = confirmed;
    guest.weplanUser = weplanUser;

    const updatedGuest = await this.guestsRepository.save(guest);

    await this.notificationsRepository.create({
      recipient_id: host_id,
      content: `O convidado ${first_name} ${last_name} foi atualizado com sucesso.`,
    });

    return updatedGuest;
  }
}

export default UpdateGuestService;
