import { injectable, inject } from 'tsyringe';

import EventMemberTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventMemberTransactionAgreement';
import IEventMemberTransactionAgreementsRepository from '@modules/transactions/repositories/IEventMemberTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventMemberNotesRepository from '@modules/notes/repositories/IEventMemberNotesRepository';
import IEventMemberRepository from '@modules/events/repositories/IEventMembersRepository';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import AppError from '@shared/errors/AppError';
import { formatBrlCurrency } from '@config/utils/formatBrlCurrency';
import ICreateEventMemberTransactionAgreementDTO from '../dtos/ICreateEventMemberTransactionAgreementDTO';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import IEventMemberTransactionsRepository from '../repositories/IEventMemberTransactionsRepository';

interface IRequest extends ICreateEventMemberTransactionAgreementDTO {
  transactions: ICreateTransactionDTO[];
}

@injectable()
class CreateEventMemberTransactionAgreementWithTransactionsService {
  constructor(
    @inject('EventMemberTransactionAgreementsRepository')
    private eventMemberTransactionAgreementsRepository: IEventMemberTransactionAgreementsRepository,

    @inject('EventMemberTransactionsRepository')
    private eventMemberTransactionsRepository: IEventMemberTransactionsRepository,

    @inject('EventMemberNotesRepository')
    private eventMemberNotesRepository: IEventMemberNotesRepository,

    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMemberRepository,

    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    amount,
    number_of_installments,
    member_id,
    transactions,
  }: IRequest): Promise<EventMemberTransactionAgreement> {
    const member = await this.eventMembersRepository.findById(member_id);
    if (!member) throw new AppError('Event member not found!');
    const agreement = await this.eventMemberTransactionAgreementsRepository.create(
      {
        amount,
        number_of_installments,
        member_id,
      },
    );
    transactions.map(
      async ({
        amount: transactionAmount,
        category,
        due_date,
        isPaid,
        name,
        payee_id,
        payer_id,
      }) => {
        const response = await this.transactionsRepository.create({
          amount: transactionAmount,
          category,
          due_date,
          isPaid,
          name,
          payee_id,
          payer_id,
        });
        await this.eventMemberTransactionsRepository.create({
          agreement_id: agreement.id,
          transaction_id: response.id,
        });
      },
    );

    const note = `
Contrato criado com fornecedor '${member.userEventMember.name}'.

No valor de '${formatBrlCurrency(amount)}' em ${number_of_installments} vezes.
`;
    const newNote = await this.notesRepository.create({
      author_id: member.event_id,
      isNew: true,
      note,
    });

    Promise.all([
      await this.eventNotesRepository.create({
        event_id: member.event_id,
        note_id: newNote.id,
      }),
      await this.eventMemberNotesRepository.create({
        member_id,
        note_id: newNote.id,
      }),
    ]);

    return agreement;
  }
}

export default CreateEventMemberTransactionAgreementWithTransactionsService;
