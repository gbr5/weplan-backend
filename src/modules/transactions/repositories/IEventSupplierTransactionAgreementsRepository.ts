import EventSupplierTransactionAgreement from '@modules/transactions/infra/typeorm/entities/EventSupplierTransactionAgreement';
import ICreateEventSupplierTransactionAgreementDTO from '@modules/transactions/dtos/ICreateEventSupplierTransactionAgreementDTO';

export default interface IEventSupplierTransactionAgreementsRepository {
  create(
    data: ICreateEventSupplierTransactionAgreementDTO,
  ): Promise<EventSupplierTransactionAgreement>;
  findById(id: string): Promise<EventSupplierTransactionAgreement | undefined>;
  findBySupplierId(
    supplier_id: string,
  ): Promise<EventSupplierTransactionAgreement[]>;
  save(
    data: EventSupplierTransactionAgreement,
  ): Promise<EventSupplierTransactionAgreement>;
  delete(data: EventSupplierTransactionAgreement): Promise<void>;
}
