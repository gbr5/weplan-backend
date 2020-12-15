import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSupplierMainTransactionsRepository from '../repositories/IEventSupplierMainTransactionsRepository';

@injectable()
class DeleteEventSupplierMainTransactionService {
  constructor(
    @inject('EventSupplierMainTransactionsRepository')
    private eventSupplierMainTransactionsRepository: IEventSupplierMainTransactionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventSupplierMainTransaction = await this.eventSupplierMainTransactionsRepository.findById(
      id,
    );

    if (!eventSupplierMainTransaction) {
      throw new AppError('No card check list found.');
    }

    await this.eventSupplierMainTransactionsRepository.delete(
      eventSupplierMainTransaction,
    );
  }
}

export default DeleteEventSupplierMainTransactionService;
