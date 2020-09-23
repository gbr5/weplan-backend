import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import TransactionAgreement from '@modules/finances/infra/typeorm/entities/TransactionAgreement';
import ITransactionAgreementsRepository from '@modules/finances/repositories/ITransactionAgreementsRepository';

@injectable()
class ListSupplierTransactionAgreementService {
  constructor(
    @inject('TransactionAgreementsRepository')
    private transactionAgreementsRepository: ITransactionAgreementsRepository,
  ) {}

  public async execute(supplier_id: string): Promise<TransactionAgreement[]> {
    const transactionAgreements = await this.transactionAgreementsRepository.findBySupplierId(
      supplier_id,
    );

    return transactionAgreements;
  }
}

export default ListSupplierTransactionAgreementService;
