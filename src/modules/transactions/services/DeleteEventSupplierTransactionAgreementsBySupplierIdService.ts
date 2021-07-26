import { injectable, inject } from 'tsyringe';

import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IEventSupplierRepository from '@modules/events/repositories/IEventSuppliersRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import Transaction from '../infra/typeorm/entities/Transaction';

@injectable()
class DeleteEventSupplierTransactionAgreementsBySupplierIdService {
  constructor(
    @inject('EventSupplierTransactionAgreementsRepository')
    private eventSupplierTransactionAgreementsRepository: IEventSupplierTransactionAgreementsRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSupplierRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(supplier_id: string): Promise<void> {
    const supplier = await this.eventSuppliersRepository.findById(supplier_id);

    if (!supplier) throw new AppError('Event supplier not found!');
    const agreements = await this.eventSupplierTransactionAgreementsRepository.findBySupplierId(
      supplier_id,
    );

    if (agreements.length <= 0)
      throw new AppError('EventSupplierTransactionAgreement not found!');

    const transactions: Transaction[] = [];

    agreements.map(agreement =>
      agreement.transactions.map(transaction => {
        const newTransaction = transaction.transaction;
        newTransaction.isPaid = false;
        newTransaction.isCancelled = true;
        transactions.push(newTransaction);
        return newTransaction;
      }),
    );

    agreements.map(agreement => {
      const newAgreement = agreement;
      newAgreement.isCancelled = true;
      return newAgreement;
    });

    Promise.all([
      transactions.map(transaction => {
        return this.transactionsRepository.save(transaction);
      }),
    ]);

    Promise.all([
      agreements.map(agreement => {
        return this.eventSupplierTransactionAgreementsRepository.save(
          agreement,
        );
      }),
    ]);

    supplier.isDischarged = true;
    supplier.isHired = false;

    await this.eventSuppliersRepository.save(supplier);
  }
}

export default DeleteEventSupplierTransactionAgreementsBySupplierIdService;
