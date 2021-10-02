import { injectable, inject } from 'tsyringe';

import EventOwnerTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventOwnerTransactionAgreement';
import IEventOwnerTransactionAgreementsRepository from '@modules/transactions/repositories/IEventOwnerTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICreateEventOwnerTransactionAgreementDTO from '../dtos/ICreateEventOwnerTransactionAgreementDTO';

@injectable()
class CreateEventOwnerTransactionAgreementService {
  constructor(
    @inject('EventOwnerTransactionAgreementsRepository')
    private eventOwnerTransactionAgreementsRepository: IEventOwnerTransactionAgreementsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    amount,
    number_of_installments,
    owner_id,
  }: ICreateEventOwnerTransactionAgreementDTO): Promise<
    EventOwnerTransactionAgreement
  > {
    const transaction = await this.eventOwnerTransactionAgreementsRepository.create(
      {
        amount,
        number_of_installments,
        owner_id,
      },
    );

    return transaction;
  }
}

export default CreateEventOwnerTransactionAgreementService;
