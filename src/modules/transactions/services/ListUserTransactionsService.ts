import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import UserTransaction from '@modules/transactions/infra/typeorm/entities/UserTransaction';
import IUserTransactionsRepository from '@modules/transactions/repositories/IUserTransactionsRepository';

@injectable()
class ListUserTransactionsService {
  constructor(
    @inject('UserTransactionsRepository')
    private userTransactionsRepository: IUserTransactionsRepository,
  ) {}

  public async execute(user_id: string): Promise<UserTransaction[]> {
    const userTransactions = await this.userTransactionsRepository.findByUser(
      user_id,
    );

    return userTransactions;
  }
}

export default ListUserTransactionsService;
