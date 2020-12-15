import { injectable, inject } from 'tsyringe';

import EventSupplierMainTransaction from '@modules/transactions/infra/typeorm/entities/EventSupplierMainTransaction';
import IEventSupplierMainTransactionsRepository from '@modules/transactions/repositories/IEventSupplierMainTransactionsRepository';
import ICreateEventSupplierMainTransactionDTO from '../dtos/ICreateEventSupplierMainTransactionDTO';

@injectable()
class CreateEventSupplierMainTransactionService {
  constructor(
    @inject('EventSupplierMainTransactionsRepository')
    private eventSupplierMainTransactionsRepository: IEventSupplierMainTransactionsRepository,
  ) {}

  public async execute(
    data: ICreateEventSupplierMainTransactionDTO,
  ): Promise<EventSupplierMainTransaction> {
    const eventSupplierMainTransaction = await this.eventSupplierMainTransactionsRepository.create(
      data,
    );

    return eventSupplierMainTransaction;
  }
}

export default CreateEventSupplierMainTransactionService;
