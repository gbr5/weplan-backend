import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IGuestContactsRepository from '../repositories/IGuestContactsRepository';

interface IEmail {
  email: string;
}

interface IPhoneNumber {
  number: string;
}

interface IContact {
  givenName: string;
  familyName: string;
  emailAddresses: IEmail[];
  phoneNumbers: IPhoneNumber[];
}

interface IRequest {
  host_id: string;
  event_id: string;
  contacts: IContact[];
}

@injectable()
class CreateGuestService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('GuestContactsRepository')
    private guestContactsRepository: IGuestContactsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    host_id,
    event_id,
    contacts,
  }: IRequest): Promise<void> {
    const host = await this.usersRepository.findById(host_id);
    if (!host) {
      throw new AppError('Host not found!');
    }

    if (contacts && contacts.length > 0)
      Promise.all([
        contacts.map(async contact => {
          return this.guestsRepository
            .create({
              first_name: contact.givenName,
              last_name: contact.familyName,
              description: '',
              event_id,
              host_id,
              confirmed: false,
              weplanUser: false,
            })
            .then(response => {
              if (
                contact &&
                contact.phoneNumbers &&
                contact.phoneNumbers.length > 0
              ) {
                contact.phoneNumbers.map(({ number }) => {
                  return this.guestContactsRepository.create({
                    contact_info: number,
                    contact_type: 'Phone',
                    guest_id: response.id,
                  });
                });
              }
              if (
                contact &&
                contact.emailAddresses &&
                contact.emailAddresses.length > 0
              ) {
                contact.emailAddresses.map(({ email }) => {
                  return this.guestContactsRepository.create({
                    contact_info: email,
                    contact_type: 'Email',
                    guest_id: response.id,
                  });
                });
              }
            });
        }),
      ]);
  }
}

export default CreateGuestService;
