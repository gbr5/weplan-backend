import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventSupplierMainTransaction from '@modules/transactions/infra/typeorm/entities/EventSupplierMainTransaction';
import IEventSupplierMainTransactionsRepository from '@modules/transactions/repositories/IEventSupplierMainTransactionsRepository';

@injectable()
class ListEventSupplierMainTransactionsService {
  constructor(
    @inject('EventSupplierMainTransactionsRepository')
    private eventSupplierMainTransactionsRepository: IEventSupplierMainTransactionsRepository,
  ) {}

  public async execute(
    agreement_transaction_id: string,
  ): Promise<EventSupplierMainTransaction[]> {
    const eventSupplierMainTransactions = await this.eventSupplierMainTransactionsRepository.findByAgreementTransaction(
      agreement_transaction_id,
    );

    return eventSupplierMainTransactions;
  }
}

export default ListEventSupplierMainTransactionsService;
