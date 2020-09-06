import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPersonInfoRepository from '@modules/users/repositories/IPersonInfoRepository';
import Guest from '@modules/events/infra/typeorm/entities/Guest';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IWeplanGuestsRepository from '../repositories/IWeplanGuestsRepository';

interface IRequest {
  first_name: string;
  last_name: string;
  description: string;
  event_id: string;
  host_id: string;
  confirmed: boolean;
  weplanUser: boolean;
  guest_id: string;
}

@injectable()
class CreateGuestService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,

    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

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
    guest_id,
  }: IRequest): Promise<Guest> {
    const guestExists = await this.guestsRepository.findByEventFirstNameAndLastName(
      event_id,
      first_name,
      last_name,
    );

    if (guestExists) {
      throw new AppError('The guest that you have chosen, already exists.');
    }

    if (weplanUser === true) {
      const user_id = host_id;
      console.log(
        'cheguei até a linha 63  -- weplanUser === true :',
        host_id,
        user_id,
      );
      const weplanGuestExists = await this.weplanGuestsRepository.findByGuestAndUserId(
        guest_id,
        user_id,
      );
      console.log('cheguei até a linha 68  -- weplanUser === true');

      if (weplanGuestExists) {
        throw new AppError('The guest that you have chosen, already exists.');
      }
      console.log('cheguei até a linha 73  -- weplanGuestExists === false');

      const weplanGuest = await this.personInfoRepository.findByUserId(
        guest_id,
      );

      if (weplanGuest) {
        console.log('cheguei até a linha 78  -- personInfo === true');

        const guest = await this.guestsRepository.create({
          first_name: weplanGuest.first_name,
          last_name: weplanGuest.last_name,
          description,
          event_id,
          host_id,
          confirmed,
          weplanUser,
        });
        console.log('cheguei até a linha 90  -- personInfo && guest === true');

        await this.weplanGuestsRepository.create({
          guest_id: guest.id,
          user_id,
        });
        console.log(
          'cheguei até a linha 98  -- personInfo && guest && weplanGuest === true',
        );

        await this.notificationsRepository.create({
          recipient_id: host_id,
          content: `O convidado ${first_name} ${last_name} foi adicionado com sucesso.`,
        });

        return guest;
      }
      console.log('cheguei até a linha 114', weplanGuest);
    }
    console.log(
      'cheguei até a linha 119  -- weplanGuest && weplanUser === false',
    );

    const guest = await this.guestsRepository.create({
      first_name,
      last_name,
      description,
      event_id,
      host_id,
      confirmed,
      weplanUser: false,
    });

    await this.notificationsRepository.create({
      recipient_id: host_id,
      content: `O convidado ${first_name} ${last_name} foi adicionado com sucesso.`,
    });

    return guest;
  }
}

export default CreateGuestService;
