import { injectable, inject } from 'tsyringe';

import EventOwnerTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventOwnerTransactionAgreement';
import IEventOwnerTransactionAgreementsRepository from '@modules/transactions/repositories/IEventOwnerTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { formatBrlCurrency } from '@config/utils/formatBrlCurrency';
import IEventOwnerNotesRepository from '@modules/notes/repositories/IEventOwnerNotesRepository';
import IEventOwnerRepository from '@modules/events/repositories/IEventOwnersRepository';
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
class UpdateEventOwnerTransactionAgreementService {
  constructor(
    @inject('EventOwnerTransactionAgreementsRepository')
    private eventOwnerTransactionAgreementsRepository: IEventOwnerTransactionAgreementsRepository,

    @inject('EventOwnerNotesRepository')
    private eventOwnerNotesRepository: IEventOwnerNotesRepository,

    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnerRepository,

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
  }: IRequest): Promise<EventOwnerTransactionAgreement> {
    const agreement = await this.eventOwnerTransactionAgreementsRepository.findById(
      id,
    );

    if (!agreement)
      throw new AppError('Event owner transaction agreement not found!');
    const owner = await this.eventOwnersRepository.findById(agreement.owner_id);
    if (!owner) throw new AppError('Event owner not found!');
    const fromAmout = `
Valor do contrato foi alterado de ${formatBrlCurrency(
      agreement?.amount,
    )} para ${formatBrlCurrency(amount)}
`;

    const note = `
Contrato com fornecedor ${owner.userEventOwner.name} foi alterado.
${agreement.amount !== amount ? fromAmout : ''}
${isCancelled && agreement.isCancelled ? 'Contrato cancelado!' : ''}
${isCancelled && !agreement.isCancelled ? 'Contrato foi cancelado' : ''}`;
    agreement.amount = amount;
    agreement.number_of_installments = number_of_installments;
    agreement.isCancelled = isCancelled;

    await this.eventOwnerTransactionAgreementsRepository.save(agreement);

    if (transactions) {
      Promise.all([
        transactions.map(transaction => {
          return this.transactionsRepository.save(transaction);
        }),
      ]);
    }
    const newNote = await this.notesRepository.create({
      author_id: owner.event_id,
      isNew: true,
      note,
    });

    Promise.all([
      await this.eventNotesRepository.create({
        event_id: owner.event_id,
        note_id: newNote.id,
      }),
      await this.eventOwnerNotesRepository.create({
        owner_id: owner.id,
        note_id: newNote.id,
      }),
    ]);

    return agreement;
  }
}

export default UpdateEventOwnerTransactionAgreementService;
