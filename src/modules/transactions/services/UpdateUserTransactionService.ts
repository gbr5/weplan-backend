import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserTransactionsRepository from '@modules/transactions/repositories/IUserTransactionsRepository';

import UserTransaction from '@modules/transactions/infra/typeorm/entities/UserTransaction';

interface IUserTransactionDTO {
  id: string;
  weplanUser: string;
  weplanUserType: string;
  transaction_type: string;
  description: string;
}

@injectable()
class UpdateUserTransactionService {
  constructor(
    @inject('UserTransactionsRepository')
    private userTransactionsRepository: IUserTransactionsRepository,
  ) {}

  public async execute({
    id,
    weplanUser,
    weplanUserType,
    transaction_type,
    description,
  }: IUserTransactionDTO): Promise<UserTransaction> {
    const userTransaction = await this.userTransactionsRepository.findById(id);

    if (!userTransaction) {
      throw new AppError('UserTransaction not found.');
    }
    userTransaction.weplanUser = weplanUser;
    userTransaction.weplanUserType = weplanUserType;
    userTransaction.transaction_type = transaction_type;
    userTransaction.description = description;

    const updatedUserTransaction = await this.userTransactionsRepository.save(
      userTransaction,
    );

    return updatedUserTransaction;
  }
}

export default UpdateUserTransactionService;
