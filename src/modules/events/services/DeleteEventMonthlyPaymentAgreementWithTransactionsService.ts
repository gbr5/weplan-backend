import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventMonthlyPaymentAgreementsRepository from '@modules/events/repositories/IEventMonthlyPaymentAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventOwnerTransactionAgreementsRepository from '@modules/transactions/repositories/IEventOwnerTransactionAgreementsRepository';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import IEventMemberTransactionAgreementsRepository from '@modules/transactions/repositories/IEventMemberTransactionAgreementsRepository';
import EventMemberTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventMemberTransactionAgreement';
import EventOwnerTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventOwnerTransactionAgreement';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import EventMonthlyPaymentAgreement from '../infra/typeorm/entities/EventMonthlyPaymentAgreement';
import IFindAllByIds from '../dtos/IFindAllEventTasksByIdsDTO';

interface IResponse extends EventMonthlyPaymentAgreement {
  eventMemberTransactionAgreements: EventMemberTransactionAgreement[];
  eventOwnerTransactionAgreements: EventOwnerTransactionAgreement[];
}

@injectable()
class DeleteEventMonthlyPaymentAgreementWithTransactionsService {
  constructor(
    @inject('EventMonthlyPaymentAgreementsRepository')
    private eventMonthlyPaymentAgreementsRepository: IEventMonthlyPaymentAgreementsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('EventOwnerTransactionAgreementsRepository')
    private eventOwnerTransactionAgreementsRepository: IEventOwnerTransactionAgreementsRepository,

    @inject('EventMemberTransactionAgreementsRepository')
    private eventMemberTransactionAgreementsRepository: IEventMemberTransactionAgreementsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const monthlyAgreement = await this.eventMonthlyPaymentAgreementsRepository.findById(
      id,
    );

    if (!monthlyAgreement) throw new Error('Monthly Payment not found');

    const memberAgreementIds: IFindAllByIds[] = [];

    monthlyAgreement.memberAgreements.map(memberAgreement =>
      memberAgreementIds.push({
        id: memberAgreement.event_member_agreement_id,
      }),
    );

    const ownerAgreementIds: IFindAllByIds[] = [];

    monthlyAgreement.ownerAgreements.map(ownerAgreement =>
      ownerAgreementIds.push({
        id: ownerAgreement.event_owner_agreement_id,
      }),
    );
    const memberAgreements = await this.eventMemberTransactionAgreementsRepository.findByAllId(
      memberAgreementIds,
    );
    const ownerAgreements = await this.eventOwnerTransactionAgreementsRepository.findByAllId(
      ownerAgreementIds,
    );

    const transactions: Transaction[] = [];

    const newMemberAgreements = memberAgreements.map(agreement => {
      agreement.transactions.map(({ transaction }) => {
        transactions.push({
          ...transaction,
          isCancelled: true,
        });
        return transaction;
      });
      return {
        ...agreement,
        isCancelled: true,
      };
    });
    const newOwnerAgreements = ownerAgreements.map(agreement => {
      agreement.transactions.map(({ transaction }) => {
        transactions.push({
          ...transaction,
          isCancelled: true,
        });
        return transaction;
      });
      return {
        ...agreement,
        isCancelled: true,
      };
    });

    Promise.all([
      newMemberAgreements.map(agreement => {
        return this.eventMemberTransactionAgreementsRepository.save(agreement);
      }),
      newOwnerAgreements.map(agreement => {
        return this.eventOwnerTransactionAgreementsRepository.save(agreement);
      }),
      transactions.map(transaction => {
        return this.transactionsRepository.save(transaction);
      }),
    ]);
    await this.eventMonthlyPaymentAgreementsRepository.delete(
      monthlyAgreement.id,
    );
  }
}

export default DeleteEventMonthlyPaymentAgreementWithTransactionsService;
