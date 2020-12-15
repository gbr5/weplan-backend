import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMainTransactionsRepository from '@modules/transactions/repositories/IMainTransactionsRepository';

import MainTransaction from '@modules/transactions/infra/typeorm/entities/MainTransaction';

interface IMainTransactionDTO {
  id: string;
  value: number;
  date: Date;
}

@injectable()
class UpdateMainTransactionService {
  constructor(
    @inject('MainTransactionsRepository')
    private mainTransactionsRepository: IMainTransactionsRepository,
  ) {}

  public async execute({
    id,
    value,
    date,
  }: IMainTransactionDTO): Promise<MainTransaction> {
    const mainTransaction = await this.mainTransactionsRepository.findById(id);

    if (!mainTransaction) {
      throw new AppError('MainTransaction not found.');
    }
    mainTransaction.value = value;
    mainTransaction.date = date;

    const updatedMainTransaction = await this.mainTransactionsRepository.save(
      mainTransaction,
    );

    return updatedMainTransaction;
  }
}

export default UpdateMainTransactionService;
