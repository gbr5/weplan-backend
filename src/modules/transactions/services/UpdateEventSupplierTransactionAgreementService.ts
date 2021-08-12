import { injectable, inject } from 'tsyringe';

import EventSupplierTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventSupplierTransactionAgreement';
import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { formatBrlCurrency } from '@config/utils/formatBrlCurrency';
import IEventSupplierNotesRepository from '@modules/notes/repositories/IEventSupplierNotesRepository';
import IEventSupplierRepository from '@modules/events/repositories/IEventSuppliersRepository';
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
class UpdateEventSupplierTransactionAgreementService {
  constructor(
    @inject('EventSupplierTransactionAgreementsRepository')
    private eventSupplierTransactionAgreementsRepository: IEventSupplierTransactionAgreementsRepository,

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
    id,
    amount,
    number_of_installments,
    isCancelled,
    transactions,
  }: IRequest): Promise<EventSupplierTransactionAgreement> {
    const agreement = await this.eventSupplierTransactionAgreementsRepository.findById(
      id,
    );

    if (!agreement)
      throw new AppError('Event supplier transaction agreement not found!');
    const supplier = await this.eventSuppliersRepository.findById(
      agreement.supplier_id,
    );
    if (!supplier) throw new AppError('Event supplier not found!');
    const fromAmout = `
Valor do contrato foi alterado de ${formatBrlCurrency(
      agreement?.amount,
    )} para ${formatBrlCurrency(amount)}`;

    const note = `
Contrato com fornecedor ${supplier.name} foi alterado.
${agreement.amount !== amount && fromAmout}
${isCancelled && 'Contrato foi cancelado!'}
`;
    agreement.amount = amount;
    agreement.number_of_installments = number_of_installments;
    agreement.isCancelled = isCancelled;

    await this.eventSupplierTransactionAgreementsRepository.save(agreement);

    if (transactions)
      Promise.all([
        transactions.map(transaction => {
          return this.transactionsRepository.save(transaction);
        }),
      ]);

    const newNote = await this.notesRepository.create({
      author_id: supplier.event_id,
      isNew: true,
      note,
    });
    Promise.all([
      await this.eventNotesRepository.create({
        event_id: supplier.event_id,
        note_id: newNote.id,
      }),
      await this.eventSupplierNotesRepository.create({
        supplier_id: supplier.id,
        note_id: newNote.id,
      }),
    ]);
    return agreement;
  }
}

export default UpdateEventSupplierTransactionAgreementService;
