import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import Guest from '@modules/events/infra/typeorm/entities/Guest';

interface IRequest {
  first_name: string;
  last_name: string;
  description: string;
  host_id: string;
  confirmed: boolean;
  id: string;
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
    last_name,
    description,
    host_id,
    confirmed,
    id,
  }: IRequest): Promise<Guest> {
    const guest = await this.guestsRepository.findByGuestId(id);

    if (!guest) {
      throw new AppError('Guest not found.');
    }

    guest.first_name = first_name;
    guest.last_name = last_name;
    guest.description = description;
    guest.confirmed = confirmed;

    const updatedGuest = await this.guestsRepository.save(guest);

    await this.notificationsRepository.create({
      recipient_id: host_id,
      content: `O convidado ${first_name} ${last_name} foi atualizado com sucesso.`,
    });

    return updatedGuest;
  }
}

export default UpdateGuestService;
