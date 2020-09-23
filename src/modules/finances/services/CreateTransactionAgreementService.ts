import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import TransactionAgreement from '@modules/finances/infra/typeorm/entities/TransactionAgreement';
import ICreateTransactionAgreementDTO from '@modules/finances/dtos/ICreateTransactionAgreementDTO';
import ITransactionAgreementRepository from '@modules/finances/repositories/ITransactionAgreementsRepository';
import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateTransactionAgreementService {
  constructor(
    @inject('TransactionAgreementsRepository')
    private appointmentsRepository: ITransactionAgreementRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSuppliersRepository,
  ) {}

  public async execute({
    supplier_id,
    amount,
    number_of_installments,
  }: ICreateTransactionAgreementDTO): Promise<TransactionAgreement> {
    const supplier = await this.eventSuppliersRepository.findById(supplier_id);

    if (!supplier) {
      throw new AppError('Event supplier not found.');
    }

    const findTransactionAgreement = await this.appointmentsRepository.findBySupplierIdAndAmount(
      supplier_id,
      amount,
    );

    if (findTransactionAgreement) {
      throw new AppError('A agreement similar to that, already exists');
    }

    const appointment = await this.appointmentsRepository.create({
      supplier_id,
      amount,
      number_of_installments,
    });

    return appointment;
  }
}

export default CreateTransactionAgreementService;
