import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import IGuestContactsRepository from '@modules/events/repositories/IGuestContactsRepository';
import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import Guest from '@modules/events/infra/typeorm/entities/Guest';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  guest_id: string;
  user_id: string;
  host_id: string;
}

@injectable()
class AssociateUserToEventGuestService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('GuestContactsRepository')
    private guestContactsRepository: IGuestContactsRepository,

    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    host_id,
    guest_id,
  }: IRequest): Promise<Guest> {
    const guest = await this.guestsRepository.findByGuestId(guest_id);

    if (!guest || guest.host_id !== host_id) {
      throw new AppError('Guest not found.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User guest not found.');
    }

    await this.weplanGuestsRepository.create({
      event_id: guest.event_id,
      guest_id,
      user_id,
    });

    guest.weplanUser = true;

    if (user.userContacts.length > 0) {
      Promise.all([
        user.userContacts.map(contact =>
          this.guestContactsRepository.create({
            contact_info: contact.contact_info,
            contact_type: contact.contact_type,
            guest_id,
          }),
        ),
      ]);
    }
    if (user.personInfo && user.personInfo.first_name) {
      guest.first_name = user.personInfo.first_name;
      guest.last_name = user.personInfo.last_name;
    }

    const updatedGuest = await this.guestsRepository.save(guest);

    return updatedGuest;
  }
}

export default AssociateUserToEventGuestService;
