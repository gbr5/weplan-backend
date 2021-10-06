import { injectable, inject } from 'tsyringe';

import EventMonthlyPaymentAgreement from '@modules/events/infra/typeorm/entities/EventMonthlyPaymentAgreement';
import IEventMonthlyPaymentAgreementsRepository from '@modules/events/repositories/IEventMonthlyPaymentAgreementsRepository';
import AppError from '@shared/errors/AppError';
import IEventOwnerTransactionAgreementsRepository from '@modules/transactions/repositories/IEventOwnerTransactionAgreementsRepository';
import IEventMemberTransactionAgreementsRepository from '@modules/transactions/repositories/IEventMemberTransactionAgreementsRepository';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import IEventOwnerTransactionsRepository from '@modules/transactions/repositories/IEventOwnerTransactionsRepository';
import IEventMemberTransactionsRepository from '@modules/transactions/repositories/IEventMemberTransactionsRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import ICreateEventParticipantsMonthlyPaymentAgreementsDTO from '../dtos/ICreateEventParticipantsMonthlyPaymentAgreementsDTO';
import IEventOwnerMonthlyPaymentAgreementsRepository from '../repositories/IEventOwnerMonthlyPaymentAgreementsRepository';
import IEventMemberMonthlyPaymentAgreementsRepository from '../repositories/IEventMemberMonthlyPaymentAgreementsRepository';

@injectable()
class CreateEventParticipantMonthlyPaymentAgreementsService {
  constructor(
    @inject('EventMonthlyPaymentAgreementsRepository')
    private eventMonthlyPaymentAgreementsRepository: IEventMonthlyPaymentAgreementsRepository,

    @inject('EventOwnerMonthlyPaymentAgreementsRepository')
    private eventOwnerMonthlyPaymentAgreementsRepository: IEventOwnerMonthlyPaymentAgreementsRepository,

    @inject('EventMemberMonthlyPaymentAgreementsRepository')
    private eventMemberMonthlyPaymentAgreementsRepository: IEventMemberMonthlyPaymentAgreementsRepository,

    @inject('EventOwnerTransactionAgreementsRepository')
    private eventOwnerTransactionAgreementsRepository: IEventOwnerTransactionAgreementsRepository,

    @inject('EventOwnerTransactionsRepository')
    private eventOwnerTransactionsRepository: IEventOwnerTransactionsRepository,

    @inject('EventMemberTransactionsRepository')
    private eventMemberTransactionsRepository: IEventMemberTransactionsRepository,

    @inject('EventMemberTransactionAgreementsRepository')
    private eventMemberTransactionAgreementsRepository: IEventMemberTransactionAgreementsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    amount,
    participants,
    event_id,
    monthly_payment,
    name,
    number_of_installments,
    start_date,
  }: ICreateEventParticipantsMonthlyPaymentAgreementsDTO): Promise<
    EventMonthlyPaymentAgreement
  > {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    const newEventMonthlyPaymentAgreement = await this.eventMonthlyPaymentAgreementsRepository.create(
      {
        event_id,
        monthly_payment,
        name,
        number_of_installments,
        start_date: new Date(start_date),
      },
    );

    const owners = participants.filter(
      participant => participant.participant_type === 'owner',
    );
    const members = participants.filter(
      participant => participant.participant_type === 'member',
    );

    if (owners.length > 0) {
      Promise.all([
        owners.map(owner => {
          return this.eventOwnerTransactionAgreementsRepository
            .create({
              amount,
              number_of_installments,
              owner_id: owner.participant_id,
            })
            .then(ownerTransactionAgreement => {
              this.eventOwnerMonthlyPaymentAgreementsRepository.create({
                event_owner_agreement_id: ownerTransactionAgreement.id,
                monthly_payment_agreement_id:
                  newEventMonthlyPaymentAgreement.id,
              });
              owner.transactions.map(transaction =>
                this.transactionsRepository
                  .create(transaction)
                  .then(newTransaction => {
                    return this.eventOwnerTransactionsRepository.create({
                      agreement_id: ownerTransactionAgreement.id,
                      transaction_id: newTransaction.id,
                    });
                  }),
              );
            });
        }),
      ]);
    }

    if (members.length > 0) {
      Promise.all([
        members.map(member => {
          return this.eventMemberTransactionAgreementsRepository
            .create({
              amount,
              number_of_installments,
              member_id: member.participant_id,
            })
            .then(memberTransactionAgreement => {
              this.eventMemberMonthlyPaymentAgreementsRepository.create({
                event_member_agreement_id: memberTransactionAgreement.id,
                monthly_payment_agreement_id:
                  newEventMonthlyPaymentAgreement.id,
              });
              member.transactions.map(transaction =>
                this.transactionsRepository
                  .create(transaction)
                  .then(newTransaction => {
                    return this.eventMemberTransactionsRepository.create({
                      agreement_id: memberTransactionAgreement.id,
                      transaction_id: newTransaction.id,
                    });
                  }),
              );
            });
        }),
      ]);
    }
    return newEventMonthlyPaymentAgreement;
  }
}

export default CreateEventParticipantMonthlyPaymentAgreementsService;
