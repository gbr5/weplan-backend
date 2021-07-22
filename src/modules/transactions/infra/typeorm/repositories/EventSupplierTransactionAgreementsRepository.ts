import { getRepository, Repository } from 'typeorm';

import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';

import EventSupplierTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventSupplierTransactionAgreement';
import ICreateEventSupplierTransactionAgreementDTO from '@modules/transactions/dtos/ICreateEventSupplierTransactionAgreementDTO';

class EventSupplierTransactionAgreementsRepository
  implements IEventSupplierTransactionAgreementsRepository {
  private ormRepository: Repository<EventSupplierTransactionAgreement>;

  constructor() {
    this.ormRepository = getRepository(EventSupplierTransactionAgreement);
  }

  public async findById(
    id: string,
  ): Promise<EventSupplierTransactionAgreement | undefined> {
    const findEventSupplierTransactionAgreement = await this.ormRepository.findOne(
      id,
    );

    return findEventSupplierTransactionAgreement;
  }

  public async findBySupplierId(
    supplier_id: string,
  ): Promise<EventSupplierTransactionAgreement[]> {
    const findEventSupplierTransactionAgreements = await this.ormRepository.find(
      {
        where: { supplier_id },
      },
    );

    return findEventSupplierTransactionAgreements;
  }

  public async create(
    data: ICreateEventSupplierTransactionAgreementDTO,
  ): Promise<EventSupplierTransactionAgreement> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(
    transaction: EventSupplierTransactionAgreement,
  ): Promise<EventSupplierTransactionAgreement> {
    return this.ormRepository.save(transaction);
  }

  public async delete(
    transaction: EventSupplierTransactionAgreement,
  ): Promise<void> {
    await this.ormRepository.delete(transaction.id);
  }
}

export default EventSupplierTransactionAgreementsRepository;
