import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPersonInfoRepository from '@modules/users/repositories/IPersonInfoRepository';
import Guest from '@modules/events/infra/typeorm/entities/Guest';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IWeplanGuestsRepository from '../repositories/IWeplanGuestsRepository';

interface IRequest {
  host_id: string;
  first_name: string;
  last_name: string;
  event_id: string;
  description: string;
  confirmed: boolean;
  weplanUser: boolean;
  user_id: string;
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
    host_id,
    first_name,
    last_name,
    event_id,
    description,
    confirmed,
    weplanUser,
    user_id,
  }: IRequest): Promise<Guest> {
    const guestExists = await this.guestsRepository.findByEventFirstNameAndLastName(
      event_id,
      first_name,
      last_name,
    );
    if (guestExists) {
      throw new AppError('The guest that you have chosen, already exists.');
    }

    if (weplanUser) {
      const weplanGuestExists = await this.weplanGuestsRepository.findByEventAndUserId(
        event_id,
        user_id,
      );

      if (weplanGuestExists) {
        throw new AppError('The guest that you have chosen, already exists.');
      }

      const weplanGuestInfo = await this.personInfoRepository.findByUserId(
        user_id,
      );

      if (weplanGuestInfo !== undefined) {
        const guest = await this.guestsRepository.create({
          first_name: weplanGuestInfo.first_name,
          last_name: weplanGuestInfo.last_name,
          description,
          event_id,
          host_id,
          confirmed,
          weplanUser,
        });

        await this.weplanGuestsRepository.create({
          user_id: weplanGuestInfo.user_id,
          guest_id: guest.id,
          event_id,
        });

        await this.notificationsRepository.create({
          recipient_id: host_id,
          content: `O convidado ${first_name} ${last_name} foi adicionado com sucesso.`,
        });

        return guest;
      }
    }

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
