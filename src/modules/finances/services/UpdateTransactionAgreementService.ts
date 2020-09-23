import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITransactionAgreementRepository from '@modules/finances/repositories/ITransactionAgreementsRepository';
import TransactionAgreement from '../infra/typeorm/entities/TransactionAgreement';

@injectable()
class UpdateTransactionAgreementService {
  constructor(
    @inject('TransactionAgreementsRepository')
    private appointmentsRepository: ITransactionAgreementRepository,
  ) {}

  public async execute(
    id: string,
    amount: number,
    number_of_installments: number,
  ): Promise<TransactionAgreement> {
    const findTransactionAgreement = await this.appointmentsRepository.findById(
      id,
    );

    if (!findTransactionAgreement) {
      throw new AppError('Transaction Agreement  not found.');
    }

    findTransactionAgreement.amount = amount;
    findTransactionAgreement.number_of_installments = number_of_installments;

    const updatedTransactionAgreement = await this.appointmentsRepository.save(
      findTransactionAgreement,
    );

    return updatedTransactionAgreement;
  }
}

export default UpdateTransactionAgreementService;
