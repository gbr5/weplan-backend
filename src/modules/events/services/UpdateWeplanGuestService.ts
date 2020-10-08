import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import Guest from '@modules/events/infra/typeorm/entities/Guest';

interface IRequest {
  confirmed: boolean;
  id: string;
}
@injectable()
class UpdateWeplanGuestService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ confirmed, id }: IRequest): Promise<Guest> {
    const guest = await this.guestsRepository.findByGuestId(id);

    if (!guest) {
      throw new AppError('Guest not found.');
    }

    guest.confirmed = confirmed;

    const updatedGuest = await this.guestsRepository.save(guest);

    return updatedGuest;
  }
}

export default UpdateWeplanGuestService;
