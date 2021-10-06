import { getRepository, Repository } from 'typeorm';

import IEventOwnerTransactionAgreementsRepository from '@modules/transactions/repositories/IEventOwnerTransactionAgreementsRepository';

import EventOwnerTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventOwnerTransactionAgreement';
import ICreateEventOwnerTransactionAgreementDTO from '@modules/transactions/dtos/ICreateEventOwnerTransactionAgreementDTO';
import IFindAllByIds from '@modules/events/dtos/IFindAllEventTasksByIdsDTO';

class EventOwnerTransactionAgreementsRepository
  implements IEventOwnerTransactionAgreementsRepository {
  private ormRepository: Repository<EventOwnerTransactionAgreement>;

  constructor() {
    this.ormRepository = getRepository(EventOwnerTransactionAgreement);
  }

  public async findById(
    id: string,
  ): Promise<EventOwnerTransactionAgreement | undefined> {
    const findEventOwnerTransactionAgreement = await this.ormRepository.findOne(
      id,
    );

    return findEventOwnerTransactionAgreement;
  }

  public async findByAllId(
    ids: IFindAllByIds[],
  ): Promise<EventOwnerTransactionAgreement[]> {
    const findEventOwnerTransactionAgreement = await this.ormRepository.findByIds(
      ids,
    );

    return findEventOwnerTransactionAgreement;
  }

  public async findByOwnerId(
    owner_id: string,
  ): Promise<EventOwnerTransactionAgreement[]> {
    const findEventOwnerTransactionAgreements = await this.ormRepository.find({
      where: { owner_id },
      // relations: ['event_owner_transactions'],
      // loadRelationIds: true,
    });

    return findEventOwnerTransactionAgreements;
  }

  public async create({
    amount,
    number_of_installments,
    owner_id,
  }: ICreateEventOwnerTransactionAgreementDTO): Promise<
    EventOwnerTransactionAgreement
  > {
    const transaction = this.ormRepository.create({
      amount,
      number_of_installments,
      owner_id,
      isCancelled: false,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(
    transaction: EventOwnerTransactionAgreement,
  ): Promise<EventOwnerTransactionAgreement> {
    return this.ormRepository.save(transaction);
  }

  public async delete(
    transaction: EventOwnerTransactionAgreement,
  ): Promise<void> {
    await this.ormRepository.delete(transaction.id);
  }
}

export default EventOwnerTransactionAgreementsRepository;
