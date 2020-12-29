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
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(wp_guest_id: string): Promise<IResponse> {
    const cacheKey = `wp-guest-messages:${wp_guest_id}`;

    let wpGuestMessages = await this.cacheProvider.recover<IResponse>(cacheKey);

    if (!wpGuestMessages) {
      const wpGuestSentMessages = await this.userConfirmationRepository.findBySenderId(
        wp_guest_id,
      );
      const wpGuestReceivedMessages = await this.userConfirmationRepository.findByReceiverId(
        wp_guest_id,
      );

      wpGuestMessages = {
        wpGuestSentMessages,
        wpGuestReceivedMessages,
      };

      await this.cacheProvider.save(cacheKey, wpGuestMessages);
    }

    return wpGuestMessages;
  }
}

export default ListWePlanGuestMessagesService;
