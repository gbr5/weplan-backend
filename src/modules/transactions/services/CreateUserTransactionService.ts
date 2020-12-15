import { injectable, inject } from 'tsyringe';

import UserTransaction from '@modules/transactions/infra/typeorm/entities/UserTransaction';
import IUserTransactionsRepository from '@modules/transactions/repositories/IUserTransactionsRepository';
import ICreateUserTransactionDTO from '../dtos/ICreateUserTransactionDTO';

@injectable()
class CreateUserTransactionService {
  constructor(
    @inject('UserTransactionsRepository')
    private userTransactionsRepository: IUserTransactionsRepository,
  ) {}

  public async execute(
    data: ICreateUserTransactionDTO,
  ): Promise<UserTransaction> {
    const userTransaction = await this.userTransactionsRepository.create(data);

    return userTransaction;
  }
}

export default CreateUserTransactionService;
