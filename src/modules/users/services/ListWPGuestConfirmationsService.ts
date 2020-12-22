import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IUserConfirmation {
  userConfirmation: UserConfirmation;
  isSender: boolean;
  sender: User;
  receiver: User;
}

@injectable()
class ListWPGuestConfirmationsService {
  constructor(
    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,

    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(wp_guest_id: string): Promise<IUserConfirmation[]> {
    const wpGuest = await this.weplanGuestsRepository.findById(wp_guest_id);

    if (!wpGuest) {
      throw new AppError('Guest not found!');
    }

    const userReceiverConfirmations = await this.userConfirmationRepository.findByReceiverId(
      wp_guest_id,
    );

    const userSenderConfirmations = await this.userConfirmationRepository.findBySenderId(
      wp_guest_id,
    );

    const sendersIds = userReceiverConfirmations.map(
      sender => sender.sender_id,
    );
    const receiversIds = userSenderConfirmations.map(
      sender => sender.receiver_id,
    );

    const senders = await this.usersRepository.findByAllById(sendersIds);
    const receivers = await this.usersRepository.findByAllById(receiversIds);

    const response: IUserConfirmation[] = [];

    userReceiverConfirmations.map(userConfirmation => {
      const sender = senders.filter(
        xSender => xSender.id === userConfirmation.sender_id,
      );
      if (sender[0]) {
        response.push({
          userConfirmation,
          isSender: false,
          sender: sender[0],
          receiver: wpGuest.weplanUserGuest,
        });
      }
      return {
        userConfirmation,
        sender: sender[0],
        receiver: wpGuest.weplanUserGuest,
      };
    });

    userReceiverConfirmations.map(userConfirmation => {
      const receiver = receivers.filter(
        xReceiver => xReceiver.id === userConfirmation.receiver_id,
      );
      if (receiver[0]) {
        response.push({
          userConfirmation,
          isSender: true,
          sender: wpGuest.weplanUserGuest,
          receiver: receiver[0],
        });
      }
      return {
        userConfirmation,
        sender: wpGuest.weplanUserGuest,
        receiver: receiver[0],
      };
    });

    return response;
  }
}

export default ListWPGuestConfirmationsService;
