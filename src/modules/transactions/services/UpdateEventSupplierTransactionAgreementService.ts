import { injectable, inject } from 'tsyringe';

import EventSupplierTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventSupplierTransactionAgreement';
import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  id: string;
  amount: number;
  number_of_installments: number;
  isCancelled: boolean;
  transactions?: Transaction[];
}

@injectable()
class UpdateEventSupplierTransactionAgreementService {
  constructor(
    @inject('EventSupplierTransactionAgreementsRepository')
    private eventSupplierTransactionAgreementsRepository: IEventSupplierTransactionAgreementsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    amount,
    number_of_installments,
    isCancelled,
    transactions,
  }: IRequest): Promise<EventSupplierTransactionAgreement> {
    const agreement = await this.eventSupplierTransactionAgreementsRepository.findById(
      id,
    );

    if (!agreement)
      throw new AppError('Event supplier transaction agreement not found!');

    agreement.amount = amount;
    agreement.number_of_installments = number_of_installments;
    agreement.isCancelled = isCancelled;

    await this.eventSupplierTransactionAgreementsRepository.save(agreement);

    if (transactions)
      Promise.all([
        transactions.map(transaction => {
          return this.transactionsRepository.save(transaction);
        }),
      ]);

    return agreement;
  }
}

export default UpdateEventSupplierTransactionAgreementService;
