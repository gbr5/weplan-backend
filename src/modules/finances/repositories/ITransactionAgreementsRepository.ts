import TransactionAgreement from '@modules/finances/infra/typeorm/entities/TransactionAgreement';
import ICreateTransactionAgreementDTO from '@modules/finances/dtos/ICreateTransactionAgreementDTO';

export default interface ITransactionAgreementsRepository {
  create(data: ICreateTransactionAgreementDTO): Promise<TransactionAgreement>;
  findBySupplierId(supplier_id: string): Promise<TransactionAgreement[]>;
  findBySupplierIdAndAmount(
    supplier_id: string,
    amount: number,
  ): Promise<TransactionAgreement | undefined>;
  findById(id: string): Promise<TransactionAgreement | undefined>;
  save(data: TransactionAgreement): Promise<TransactionAgreement>;
  delete(data: TransactionAgreement): Promise<void>;
}
