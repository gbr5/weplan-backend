import { injectable, inject } from 'tsyringe';

import EventMemberTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventMemberTransactionAgreement';
import IEventMemberTransactionAgreementsRepository from '@modules/transactions/repositories/IEventMemberTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { formatBrlCurrency } from '@config/utils/formatBrlCurrency';
import IEventMemberNotesRepository from '@modules/notes/repositories/IEventMemberNotesRepository';
import IEventMemberRepository from '@modules/events/repositories/IEventMembersRepository';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import Transaction from '../infra/typeorm/entities/Transaction';

interface IRequest {
  id: string;
  amount: number;
  number_of_installments: number;
  isCancelled: boolean;
  transactions?: Transaction[];
}

@injectable()
class UpdateEventMemberTransactionAgreementService {
  constructor(
    @inject('EventMemberTransactionAgreementsRepository')
    private eventMemberTransactionAgreementsRepository: IEventMemberTransactionAgreementsRepository,

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
    id,
    amount,
    number_of_installments,
    isCancelled,
    transactions,
  }: IRequest): Promise<EventMemberTransactionAgreement> {
    const agreement = await this.eventMemberTransactionAgreementsRepository.findById(
      id,
    );

    if (!agreement)
      throw new AppError('Event member transaction agreement not found!');
    const member = await this.eventMembersRepository.findById(
      agreement.member_id,
    );
    if (!member) throw new AppError('Event member not found!');
    const fromAmout = `
Valor do contrato foi alterado de ${formatBrlCurrency(
      agreement?.amount,
    )} para ${formatBrlCurrency(amount)}
`;

    const note = `
Contrato com fornecedor ${member.userEventMember.name} foi alterado.
${agreement.amount !== amount ? fromAmout : ''}
${isCancelled && agreement.isCancelled ? 'Contrato cancelado!' : ''}
${isCancelled && !agreement.isCancelled ? 'Contrato foi cancelado' : ''}`;
    agreement.amount = amount;
    agreement.number_of_installments = number_of_installments;
    agreement.isCancelled = isCancelled;

    await this.eventMemberTransactionAgreementsRepository.save(agreement);

    if (transactions) {
      Promise.all([
        transactions.map(transaction => {
          return this.transactionsRepository.save(transaction);
        }),
      ]);
    }
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
        member_id: member.id,
        note_id: newNote.id,
      }),
    ]);

    return agreement;
  }
}

export default UpdateEventMemberTransactionAgreementService;
