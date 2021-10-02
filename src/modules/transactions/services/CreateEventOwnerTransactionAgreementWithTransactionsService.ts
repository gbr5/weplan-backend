import { injectable, inject } from 'tsyringe';

import EventOwnerTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventOwnerTransactionAgreement';
import IEventOwnerTransactionAgreementsRepository from '@modules/transactions/repositories/IEventOwnerTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventOwnerNotesRepository from '@modules/notes/repositories/IEventOwnerNotesRepository';
import IEventOwnerRepository from '@modules/events/repositories/IEventOwnersRepository';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import AppError from '@shared/errors/AppError';
import { formatBrlCurrency } from '@config/utils/formatBrlCurrency';
import ICreateEventOwnerTransactionAgreementDTO from '../dtos/ICreateEventOwnerTransactionAgreementDTO';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import IEventOwnerTransactionsRepository from '../repositories/IEventOwnerTransactionsRepository';

interface IRequest extends ICreateEventOwnerTransactionAgreementDTO {
  transactions: ICreateTransactionDTO[];
}

@injectable()
class CreateEventOwnerTransactionAgreementWithTransactionsService {
  constructor(
    @inject('EventOwnerTransactionAgreementsRepository')
    private eventOwnerTransactionAgreementsRepository: IEventOwnerTransactionAgreementsRepository,

    @inject('EventOwnerTransactionsRepository')
    private eventOwnerTransactionsRepository: IEventOwnerTransactionsRepository,

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
    amount,
    number_of_installments,
    owner_id,
    transactions,
  }: IRequest): Promise<EventOwnerTransactionAgreement> {
    const owner = await this.eventOwnersRepository.findById(owner_id);
    if (!owner) throw new AppError('Event owner not found!');
    const agreement = await this.eventOwnerTransactionAgreementsRepository.create(
      {
        amount,
        number_of_installments,
        owner_id,
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
        await this.eventOwnerTransactionsRepository.create({
          agreement_id: agreement.id,
          transaction_id: response.id,
        });
      },
    );

    const note = `
Contrato criado com fornecedor '${owner.userEventOwner.name}'.

No valor de '${formatBrlCurrency(amount)}' em ${number_of_installments} vezes.
`;
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
        owner_id,
        note_id: newNote.id,
      }),
    ]);

    return agreement;
  }
}

export default CreateEventOwnerTransactionAgreementWithTransactionsService;
