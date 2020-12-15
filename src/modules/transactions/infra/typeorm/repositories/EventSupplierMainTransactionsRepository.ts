import { getRepository, Repository } from 'typeorm';

import IEventSupplierMainTransactionsRepository from '@modules/transactions/repositories/IEventSupplierMainTransactionsRepository';

import EventSupplierMainTransaction from '@modules/transactions/infra/typeorm/entities/EventSupplierMainTransaction';
import ICreateEventSupplierMainTransactionDTO from '@modules/transactions/dtos/ICreateEventSupplierMainTransactionDTO';

class EventSupplierMainTransactionsRepository
  implements IEventSupplierMainTransactionsRepository {
  private ormRepository: Repository<EventSupplierMainTransaction>;

  constructor() {
    this.ormRepository = getRepository(EventSupplierMainTransaction);
  }

  public async findById(
    id: string,
  ): Promise<EventSupplierMainTransaction | undefined> {
    const findEventSupplierMainTransaction = await this.ormRepository.findOne({
      id,
    });

    return findEventSupplierMainTransaction;
  }

  public async findByAgreementTransaction(
    agreement_transaction_id: string,
  ): Promise<EventSupplierMainTransaction[]> {
    const findEventSupplierMainTransaction = await this.ormRepository.find({
      agreement_transaction_id,
    });

    return findEventSupplierMainTransaction;
  }

  public async create(
    data: ICreateEventSupplierMainTransactionDTO,
  ): Promise<EventSupplierMainTransaction> {
    const checkList = await this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(
    checkList: EventSupplierMainTransaction,
  ): Promise<EventSupplierMainTransaction> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id }: EventSupplierMainTransaction): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default EventSupplierMainTransactionsRepository;
