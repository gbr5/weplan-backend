import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITransactionAgreementRepository from '@modules/finances/repositories/ITransactionAgreementsRepository';

@injectable()
class DeleteTransactionAgreementService {
  constructor(
    @inject('TransactionAgreementsRepository')
    private transactionAgreementsRepository: ITransactionAgreementRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findTransactionAgreement = await this.transactionAgreementsRepository.findById(
      id,
    );

    if (!findTransactionAgreement) {
      throw new AppError('Event Supplier not found.');
    }

    await this.transactionAgreementsRepository.delete(findTransactionAgreement);
  }
}

export default DeleteTransactionAgreementService;
