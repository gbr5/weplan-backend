import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IGuestContactsRepository from '../repositories/IGuestContactsRepository';
import IWeplanGuestsRepository from '../repositories/IWeplanGuestsRepository';

interface IRequest {
  host_id: string;
  event_id: string;
  users: User[];
}

@injectable()
class CreateMultipleWePlanGuestsService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('GuestContactsRepository')
    private guestContactsRepository: IGuestContactsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('WeplanGuestsRepository')
    private weplanGuestRepository: IWeplanGuestsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ host_id, event_id, users }: IRequest): Promise<void> {
    const host = await this.usersRepository.findById(host_id);
    if (!host) {
      throw new AppError('Host not found!');
    }

    if (users && users.length > 0)
      Promise.all([
        users.map(async user => {
          return this.guestsRepository
            .create({
              first_name: user.personInfo
                ? user.personInfo.first_name
                : user.name,
              last_name: user.personInfo ? user.personInfo.last_name : '',
              description: '',
              event_id,
              host_id,
              confirmed: false,
              weplanUser: true,
            })
            .then(response => {
              if (user && user.userContacts && user.userContacts.length > 0) {
                user.userContacts
                  .filter(contact => contact.contact_type === 'Phone')
                  .map(({ contact_info }) => {
                    return this.guestContactsRepository.create({
                      contact_info,
                      contact_type: 'Phone',
                      guest_id: response.id,
                    });
                  });
                user.userContacts
                  .filter(contact => contact.contact_type === 'Email')
                  .map(({ contact_info }) => {
                    return this.guestContactsRepository.create({
                      contact_info,
                      contact_type: 'Email',
                      guest_id: response.id,
                    });
                  });
              }
              return this.weplanGuestRepository.create({
                event_id,
                guest_id: response.id,
                user_id: user.id,
              });
            });
        }),
      ]);
  }
}

export default CreateMultipleWePlanGuestsService;
