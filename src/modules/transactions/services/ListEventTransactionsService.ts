import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventSupplierRepository from '@modules/events/repositories/IEventSuppliersRepository';
import EventSupplierTransactionAgreement from '../infra/typeorm/entities/EventSupplierTransactionAgreement';

interface IResponse {
  event_id: string;
  agreement_id: string;
  agreement_type: string;
  transaction: Transaction;
}

@injectable()
class ListEventTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IResponse[]> {
    const suppliers = await this.eventSuppliersRepository.findByEvent(event_id);
    const payerTransactions = await this.transactionsRepository.findByPayerId(
      event_id,
    );
    const payeeTransactions = await this.transactionsRepository.findByPayeeId(
      event_id,
    );
    const transactions: Transaction[] = [];
    payerTransactions.map(transaction => transactions.push(transaction));
    payeeTransactions.map(transaction => transactions.push(transaction));

    const supplierAgreements: EventSupplierTransactionAgreement[] = [];
    suppliers.map(supplier => {
      supplier.transactionAgreements.map(agreement =>
        supplierAgreements.push(agreement),
      );
      return supplier;
    });

    const eventTransactions: IResponse[] = [];
    transactions.map(item => {
      supplierAgreements.map(agreement => {
        agreement.transactions.map(({ transaction }) => {
          if (transaction.id === item.id) {
            eventTransactions.push({
              agreement_id: agreement.id,
              agreement_type: 'supplier',
              event_id,
              transaction,
            });
          }
          return '';
        });
        return '';
      });
      // Fazer o map dos demais tipos de agreements antes do bloco abaixo!
      const findTransaction = eventTransactions.find(
        ({ transaction }) => transaction.id === item.id,
      );
      if (!findTransaction) {
        eventTransactions.push({
          agreement_id: 'none',
          agreement_type: 'none',
          event_id,
          transaction: item,
        });
      }
      return '';
    });
    return eventTransactions;
  }
}

export default ListEventTransactionsService;
