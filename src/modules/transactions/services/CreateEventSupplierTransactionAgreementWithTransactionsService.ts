import { injectable, inject } from 'tsyringe';

import EventSupplierTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventSupplierTransactionAgreement';
import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICreateEventSupplierTransactionAgreementDTO from '../dtos/ICreateEventSupplierTransactionAgreementDTO';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import IEventSupplierTransactionsRepository from '../repositories/IEventSupplierTransactionsRepository';

interface IRequest extends ICreateEventSupplierTransactionAgreementDTO {
  transactions: ICreateTransactionDTO[];
}

@injectable()
class CreateEventSupplierTransactionAgreementWithTransactionsService {
  constructor(
    @inject('EventSupplierTransactionAgreementsRepository')
    private eventSupplierTransactionAgreementsRepository: IEventSupplierTransactionAgreementsRepository,

    @inject('EventSupplierTransactionsRepository')
    private eventSupplierTransactionsRepository: IEventSupplierTransactionsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    amount,
    number_of_installments,
    supplier_id,
    transactions,
  }: IRequest): Promise<EventSupplierTransactionAgreement> {
    const agreement = await this.eventSupplierTransactionAgreementsRepository.create(
      {
        amount,
        number_of_installments,
        supplier_id,
      },
    );
    transactions.map(async transaction => {
      const response = await this.transactionsRepository.create(transaction);
      await this.eventSupplierTransactionsRepository.create({
        agreement_id: agreement.id,
        transaction_id: response.id,
      });
    });

    return agreement;
  }
}

export default CreateEventSupplierTransactionAgreementWithTransactionsService;
