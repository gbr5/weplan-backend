import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import TransactionAgreement from '@modules/finances/infra/typeorm/entities/TransactionAgreement';
import ICreateTransactionAgreementDTO from '@modules/finances/dtos/ICreateTransactionAgreementDTO';
import ITransactionAgreementRepository from '@modules/finances/repositories/ITransactionAgreementsRepository';
import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateTransactionAgreementService {
  constructor(
    @inject('TransactionAgreementsRepository')
    private transactionAgreementsRepository: ITransactionAgreementRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSuppliersRepository,
  ) {}

  public async execute({
    supplier_id,
    amount,
    number_of_installments,
    transactions,
  }: ICreateTransactionAgreementDTO): Promise<TransactionAgreement> {
    const supplier = await this.eventSuppliersRepository.findById(supplier_id);
    if (!supplier) {
      throw new AppError('Event supplier not found.');
    }

    const findTransactionAgreement = await this.transactionAgreementsRepository.findBySupplierIdAndAmount(
      supplier_id,
      amount,
    );

    if (findTransactionAgreement !== undefined) {
      throw new AppError('A agreement similar to that, already exists');
    }

    const transactionAgreement = await this.transactionAgreementsRepository.create(
      {
        supplier_id,
        amount,
        number_of_installments,
        transactions,
      },
    );

    const findTransactions = await this.transactionsRepository.findByAgreementId(
      transactionAgreement.id,
    );

    if (findTransactions.length !== transactions.length) {
      await this.transactionsRepository.createMultiple(
        transactions,
        transactionAgreement.id,
      );
    }

    // await this.eventSuppliersRepository.save({
    //   ...supplier,
    //   isHired: supplier.isHired,
    //   // transactionAgreement: [transactionAgreement],
    // });

    return transactionAgreement;
  }
}

export default CreateTransactionAgreementService;
