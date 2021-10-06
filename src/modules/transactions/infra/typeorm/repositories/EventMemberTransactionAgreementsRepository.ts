import { getRepository, Repository } from 'typeorm';

import IEventMemberTransactionAgreementsRepository from '@modules/transactions/repositories/IEventMemberTransactionAgreementsRepository';

import EventMemberTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventMemberTransactionAgreement';
import ICreateEventMemberTransactionAgreementDTO from '@modules/transactions/dtos/ICreateEventMemberTransactionAgreementDTO';
import IFindAllByIds from '@modules/events/dtos/IFindAllEventTasksByIdsDTO';

class EventMemberTransactionAgreementsRepository
  implements IEventMemberTransactionAgreementsRepository {
  private ormRepository: Repository<EventMemberTransactionAgreement>;

  constructor() {
    this.ormRepository = getRepository(EventMemberTransactionAgreement);
  }

  public async findById(
    id: string,
  ): Promise<EventMemberTransactionAgreement | undefined> {
    const findEventMemberTransactionAgreement = await this.ormRepository.findOne(
      id,
    );

    return findEventMemberTransactionAgreement;
  }

  public async findByAllId(
    ids: IFindAllByIds[],
  ): Promise<EventMemberTransactionAgreement[]> {
    const findEventOwnerTransactionAgreement = await this.ormRepository.findByIds(
      ids,
    );

    return findEventOwnerTransactionAgreement;
  }

  public async findByMemberId(
    member_id: string,
  ): Promise<EventMemberTransactionAgreement[]> {
    const findEventMemberTransactionAgreements = await this.ormRepository.find({
      where: { member_id },
      // relations: ['event_member_transactions'],
      // loadRelationIds: true,
    });

    return findEventMemberTransactionAgreements;
  }

  public async create({
    amount,
    number_of_installments,
    member_id,
  }: ICreateEventMemberTransactionAgreementDTO): Promise<
    EventMemberTransactionAgreement
  > {
    const transaction = this.ormRepository.create({
      amount,
      number_of_installments,
      member_id,
      isCancelled: false,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(
    transaction: EventMemberTransactionAgreement,
  ): Promise<EventMemberTransactionAgreement> {
    return this.ormRepository.save(transaction);
  }

  public async delete(
    transaction: EventMemberTransactionAgreement,
  ): Promise<void> {
    await this.ormRepository.delete(transaction.id);
  }
}

export default EventMemberTransactionAgreementsRepository;
