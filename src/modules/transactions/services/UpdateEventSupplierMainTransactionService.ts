import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSupplierMainTransactionsRepository from '@modules/transactions/repositories/IEventSupplierMainTransactionsRepository';

import EventSupplierMainTransaction from '@modules/transactions/infra/typeorm/entities/EventSupplierMainTransaction';

interface IEventSupplierMainTransactionDTO {
  id: string;
  transaction_type: string;
}

@injectable()
class UpdateEventSupplierMainTransactionService {
  constructor(
    @inject('EventSupplierMainTransactionsRepository')
    private eventSupplierMainTransactionsRepository: IEventSupplierMainTransactionsRepository,
  ) {}

  public async execute({
    id,
    transaction_type,
  }: IEventSupplierMainTransactionDTO): Promise<EventSupplierMainTransaction> {
    const eventSupplierMainTransaction = await this.eventSupplierMainTransactionsRepository.findById(
      id,
    );

    if (!eventSupplierMainTransaction) {
      throw new AppError('EventSupplierMainTransaction not found.');
    }
    eventSupplierMainTransaction.transaction_type = transaction_type;

    const updatedEventSupplierMainTransaction = await this.eventSupplierMainTransactionsRepository.save(
      eventSupplierMainTransaction,
    );

    return updatedEventSupplierMainTransaction;
  }
}

export default UpdateEventSupplierMainTransactionService;
