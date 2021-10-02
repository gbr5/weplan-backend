import { injectable, inject } from 'tsyringe';

import EventMemberTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventMemberTransactionAgreement';
import IEventMemberTransactionAgreementsRepository from '@modules/transactions/repositories/IEventMemberTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICreateEventMemberTransactionAgreementDTO from '../dtos/ICreateEventMemberTransactionAgreementDTO';

@injectable()
class CreateEventMemberTransactionAgreementService {
  constructor(
    @inject('EventMemberTransactionAgreementsRepository')
    private eventMemberTransactionAgreementsRepository: IEventMemberTransactionAgreementsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    amount,
    number_of_installments,
    member_id,
  }: ICreateEventMemberTransactionAgreementDTO): Promise<
    EventMemberTransactionAgreement
  > {
    const transaction = await this.eventMemberTransactionAgreementsRepository.create(
      {
        amount,
        number_of_installments,
        member_id,
      },
    );

    return transaction;
  }
}

export default CreateEventMemberTransactionAgreementService;
