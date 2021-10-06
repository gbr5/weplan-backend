import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventMonthlyPaymentAgreementsRepository from '@modules/events/repositories/IEventMonthlyPaymentAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventOwnerTransactionAgreementsRepository from '@modules/transactions/repositories/IEventOwnerTransactionAgreementsRepository';
import IEventMemberTransactionAgreementsRepository from '@modules/transactions/repositories/IEventMemberTransactionAgreementsRepository';
import EventMemberTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventMemberTransactionAgreement';
import EventOwnerTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventOwnerTransactionAgreement';
import EventMonthlyPaymentAgreement from '../infra/typeorm/entities/EventMonthlyPaymentAgreement';
import IFindAllByIds from '../dtos/IFindAllEventTasksByIdsDTO';

interface IResponse extends EventMonthlyPaymentAgreement {
  eventMemberTransactionAgreements: EventMemberTransactionAgreement[];
  eventOwnerTransactionAgreements: EventOwnerTransactionAgreement[];
}

@injectable()
class ListEventMonthlyPaymentAgreementsService {
  constructor(
    @inject('EventMonthlyPaymentAgreementsRepository')
    private eventMonthlyPaymentAgreementsRepository: IEventMonthlyPaymentAgreementsRepository,

    @inject('EventOwnerTransactionAgreementsRepository')
    private eventOwnerTransactionAgreementsRepository: IEventOwnerTransactionAgreementsRepository,

    @inject('EventMemberTransactionAgreementsRepository')
    private eventMemberTransactionAgreementsRepository: IEventMemberTransactionAgreementsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IResponse[]> {
    const monthlyAgreements = await this.eventMonthlyPaymentAgreementsRepository.findByEventId(
      event_id,
    );

    const memberAgreementIds: IFindAllByIds[] = [];

    monthlyAgreements.filter(agreement => {
      agreement.memberAgreements.map(memberAgreement =>
        memberAgreementIds.push({
          id: memberAgreement.event_member_agreement_id,
        }),
      );
      return agreement;
    });

    const ownerAgreementIds: IFindAllByIds[] = [];

    monthlyAgreements.filter(agreement => {
      agreement.ownerAgreements.map(ownerAgreement =>
        ownerAgreementIds.push({
          id: ownerAgreement.event_owner_agreement_id,
        }),
      );
      return agreement;
    });

    const memberAgreements = await this.eventMemberTransactionAgreementsRepository.findByAllId(
      memberAgreementIds,
    );
    const ownerAgreements = await this.eventOwnerTransactionAgreementsRepository.findByAllId(
      ownerAgreementIds,
    );

    const response: IResponse[] = monthlyAgreements.map(ma => {
      const memberAgreementIDs = ma.memberAgreements.map(
        meA => meA.event_member_agreement_id,
      );
      const eventMemberTransactionAgreements: EventMemberTransactionAgreement[] = [];
      memberAgreementIDs.map(id =>
        memberAgreements.filter(
          mA => mA.id === id && eventMemberTransactionAgreements.push(mA),
        ),
      );
      const ownerAgreementIDs = ma.ownerAgreements.map(
        meA => meA.event_owner_agreement_id,
      );
      const eventOwnerTransactionAgreements: EventOwnerTransactionAgreement[] = [];
      ownerAgreementIDs.map(id =>
        ownerAgreements.filter(
          mA => mA.id === id && eventOwnerTransactionAgreements.push(mA),
        ),
      );

      return {
        ...ma,
        eventMemberTransactionAgreements,
        eventOwnerTransactionAgreements,
      };
    });
    return response;
  }
}

export default ListEventMonthlyPaymentAgreementsService;
