import { injectable, inject } from 'tsyringe';

import EventOwnerTransaction from '@modules/transactions/infra/typeorm/entities/EventOwnerTransaction';
import IEventOwnerTransactionsRepository from '@modules/transactions/repositories/IEventOwnerTransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import ICreateEventOwnerTransactionDTO from '../dtos/ICreateEventOwnerTransactionDTO';
import IEventOwnerTransactionAgreementsRepository from '../repositories/IEventOwnerTransactionAgreementsRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class CreateEventOwnerTransactionService {
  constructor(
    @inject('EventOwnerTransactionsRepository')
    private eventOwnerTransactionsRepository: IEventOwnerTransactionsRepository,

    @inject('EventOwnerTransactionAgreementsRepository')
    private eventOwnerTransactionAgreementsRepository: IEventOwnerTransactionAgreementsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    agreement_id,
    transaction_id,
  }: ICreateEventOwnerTransactionDTO): Promise<EventOwnerTransaction> {
    const agreement = await this.eventOwnerTransactionAgreementsRepository.findById(
      agreement_id,
    );

    if (!agreement) throw new AppError('Agreement not found');

    const transaction = await this.transactionsRepository.findById(
      transaction_id,
    );

    if (!transaction) throw new AppError('Agreement not found');

    const eventOwnerTransaction = await this.eventOwnerTransactionsRepository.create(
      {
        agreement_id,
        transaction_id,
      },
    );

    return eventOwnerTransaction;
  }
}

export default CreateEventOwnerTransactionService;
