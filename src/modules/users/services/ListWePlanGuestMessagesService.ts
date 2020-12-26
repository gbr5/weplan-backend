import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IResponse {
  wpGuestSentMessages: UserConfirmation[];
  wpGuestReceivedMessages: UserConfirmation[];
}

@injectable()
class ListWePlanGuestMessagesService {
  constructor(
    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(wp_guest_id: string): Promise<IResponse> {
    const wpGuestSentMessages = await this.userConfirmationRepository.findBySenderId(
      wp_guest_id,
    );
    const wpGuestReceivedMessages = await this.userConfirmationRepository.findByReceiverId(
      wp_guest_id,
    );

    return {
      wpGuestSentMessages,
      wpGuestReceivedMessages,
    };
  }
}

export default ListWePlanGuestMessagesService;
