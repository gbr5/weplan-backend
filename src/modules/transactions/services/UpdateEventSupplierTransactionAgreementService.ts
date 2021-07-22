import { injectable, inject } from 'tsyringe';

import EventSupplierTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventSupplierTransactionAgreement';
import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  amount: number;
  number_of_installments: number;
}

@injectable()
class UpdateEventSupplierTransactionAgreementService {
  constructor(
    @inject('EventSupplierTransactionAgreementsRepository')
    private transactionsRepository: IEventSupplierTransactionAgreementsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    amount,
    number_of_installments,
  }: IRequest): Promise<EventSupplierTransactionAgreement> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction)
      throw new AppError('Event supplier transaction agreement not found!');

    transaction.amount = amount;
    transaction.number_of_installments = number_of_installments;

    await this.transactionsRepository.save(transaction);

    return transaction;
  }
}

export default UpdateEventSupplierTransactionAgreementService;
