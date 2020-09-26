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
    console.log({ supplier_id, amount, number_of_installments });

    const supplier = await this.eventSuppliersRepository.findById(supplier_id);
    console.log('por aqui tudo certo', supplier);
    if (!supplier) {
      throw new AppError('Event supplier not found.');
    }

    const findTransactionAgreement = await this.transactionAgreementsRepository.findBySupplierIdAndAmount(
      supplier_id,
      amount,
    );
    console.log(findTransactionAgreement);

    if (findTransactionAgreement) {
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
      transactions.map(transaction => {
        return this.transactionsRepository.create({
          agreement_id: transactionAgreement.id,
          amount: transaction.amount,
          due_date: transaction.due_date,
          isPaid: transaction.isPaid,
        });
      });
    }

    await this.eventSuppliersRepository.save({
      id: supplier.id,
      name: supplier.name,
      event_id: supplier.event_id,
      isHired: supplier.isHired,
      supplier_sub_category: supplier.supplier_sub_category,
      created_at: supplier.created_at,
      updated_at: new Date(),
      event: supplier.event,
      subCategory: supplier.subCategory,
      weplanUser: supplier.weplanUser,
      eventWeplanSupplier: supplier.eventWeplanSupplier,
      transactionAgreement: [transactionAgreement],
    });

    return transactionAgreement;
  }
}

export default CreateTransactionAgreementService;
