import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import MainTransaction from '@modules/transactions/infra/typeorm/entities/MainTransaction';
import IMainTransactionsRepository from '@modules/transactions/repositories/IMainTransactionsRepository';

@injectable()
class ListMainTransactionsService {
  constructor(
    @inject('MainTransactionsRepository')
    private mainTransactionsRepository: IMainTransactionsRepository,
  ) {}

  public async execute(): Promise<MainTransaction[]> {
    const mainTransactions = await this.mainTransactionsRepository.findByAll();

    return mainTransactions;
  }
}

export default ListMainTransactionsService;
