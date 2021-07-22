import { injectable, inject } from 'tsyringe';

import EventSupplierTransaction from '@modules/transactions/infra/typeorm/entities/EventSupplierTransaction';
import IEventSupplierTransactionsRepository from '@modules/transactions/repositories/IEventSupplierTransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import ICreateEventSupplierTransactionDTO from '../dtos/ICreateEventSupplierTransactionDTO';
import IEventSupplierTransactionAgreementsRepository from '../repositories/IEventSupplierTransactionAgreementsRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class CreateEventSupplierTransactionService {
  constructor(
    @inject('EventSupplierTransactionsRepository')
    private eventSupplierTransactionsRepository: IEventSupplierTransactionsRepository,

    @inject('EventSupplierTransactionAgreementsRepository')
    private eventSupplierTransactionAgreementsRepository: IEventSupplierTransactionAgreementsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    agreement_id,
    transaction_id,
  }: ICreateEventSupplierTransactionDTO): Promise<EventSupplierTransaction> {
    const agreement = await this.eventSupplierTransactionAgreementsRepository.findById(
      agreement_id,
    );

    if (!agreement) throw new AppError('Agreement not found');

    const transaction = await this.transactionsRepository.findById(
      transaction_id,
    );

    if (!transaction) throw new AppError('Agreement not found');

    const eventSupplierTransaction = await this.eventSupplierTransactionsRepository.create(
      {
        agreement_id,
        transaction_id,
      },
    );

    return eventSupplierTransaction;
  }
}

export default CreateEventSupplierTransactionService;
