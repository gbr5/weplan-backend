import { injectable, inject } from 'tsyringe';

import MainTransaction from '@modules/transactions/infra/typeorm/entities/MainTransaction';
import IMainTransactionsRepository from '@modules/transactions/repositories/IMainTransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateMainTransactionDTO from '../dtos/ICreateMainTransactionDTO';

@injectable()
class CreateMainTransactionService {
  constructor(
    @inject('MainTransactionsRepository')
    private mainTransactionsRepository: IMainTransactionsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    data: ICreateMainTransactionDTO,
  ): Promise<MainTransaction> {
    const mainTransaction = await this.mainTransactionsRepository.create(data);

    return mainTransaction;
  }
}

export default CreateMainTransactionService;
