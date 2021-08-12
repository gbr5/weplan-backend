import { injectable, inject } from 'tsyringe';

import EventSupplierTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventSupplierTransactionAgreement';
import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventSupplierNotesRepository from '@modules/notes/repositories/IEventSupplierNotesRepository';
import IEventSupplierRepository from '@modules/events/repositories/IEventSuppliersRepository';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import AppError from '@shared/errors/AppError';
import { formatBrlCurrency } from '@config/utils/formatBrlCurrency';
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

    @inject('EventSupplierNotesRepository')
    private eventSupplierNotesRepository: IEventSupplierNotesRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSupplierRepository,

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
    supplier_id,
    transactions,
  }: IRequest): Promise<EventSupplierTransactionAgreement> {
    const supplier = await this.eventSuppliersRepository.findById(supplier_id);
    if (!supplier) throw new AppError('Event supplier not found!');
    const agreement = await this.eventSupplierTransactionAgreementsRepository.create(
      {
        amount,
        number_of_installments,
        supplier_id,
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
        await this.eventSupplierTransactionsRepository.create({
          agreement_id: agreement.id,
          transaction_id: response.id,
        });
      },
    );

    const note = `
Contrato criado com fornecedor ${supplier.name}.
No valor de ${formatBrlCurrency(amount)} em ${number_of_installments} vezes.
`;
    const newNote = await this.notesRepository.create({
      author_id: supplier.event_id,
      isNew: true,
      note,
    });
    await this.eventNotesRepository.create({
      event_id: supplier.event_id,
      note_id: newNote.id,
    });
    await this.eventSupplierNotesRepository.create({
      supplier_id,
      note_id: newNote.id,
    });

    return agreement;
  }
}

export default CreateEventSupplierTransactionAgreementWithTransactionsService;
