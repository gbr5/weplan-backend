import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListReceiverConfirmationsService {
  constructor(
    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(receiver_id: string): Promise<UserConfirmation[]> {
    const userConfirmation = await this.userConfirmationRepository.findByReceiverId(
      receiver_id,
    );

    return userConfirmation;
  }
}

export default ListReceiverConfirmationsService;
