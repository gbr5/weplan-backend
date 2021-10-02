import { injectable, inject } from 'tsyringe';

import EventMemberTransaction from '@modules/transactions/infra/typeorm/entities/EventMemberTransaction';
import IEventMemberTransactionsRepository from '@modules/transactions/repositories/IEventMemberTransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import ICreateEventMemberTransactionDTO from '../dtos/ICreateEventMemberTransactionDTO';
import IEventMemberTransactionAgreementsRepository from '../repositories/IEventMemberTransactionAgreementsRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class CreateEventMemberTransactionService {
  constructor(
    @inject('EventMemberTransactionsRepository')
    private eventMemberTransactionsRepository: IEventMemberTransactionsRepository,

    @inject('EventMemberTransactionAgreementsRepository')
    private eventMemberTransactionAgreementsRepository: IEventMemberTransactionAgreementsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    agreement_id,
    transaction_id,
  }: ICreateEventMemberTransactionDTO): Promise<EventMemberTransaction> {
    const agreement = await this.eventMemberTransactionAgreementsRepository.findById(
      agreement_id,
    );

    if (!agreement) throw new AppError('Agreement not found');

    const transaction = await this.transactionsRepository.findById(
      transaction_id,
    );

    if (!transaction) throw new AppError('Agreement not found');

    const eventMemberTransaction = await this.eventMemberTransactionsRepository.create(
      {
        agreement_id,
        transaction_id,
      },
    );

    return eventMemberTransaction;
  }
}

export default CreateEventMemberTransactionService;
