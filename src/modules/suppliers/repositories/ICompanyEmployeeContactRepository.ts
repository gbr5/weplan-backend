import CompanyEmployeeContact from '@modules/suppliers/infra/typeorm/entities/CompanyEmployeeContact';
import ICreateCompanyEmployeeContactDTO from '@modules/suppliers/dtos/ICreateCompanyEmployeeContactDTO';

export default interface ICompanyEmployeeContactsRepository {
  create(
    data: ICreateCompanyEmployeeContactDTO,
  ): Promise<CompanyEmployeeContact>;
  findByCompanyContactId(
    company_contact_id: string,
  ): Promise<CompanyEmployeeContact | undefined>;
  findByEmployeeId(
    employee_id: string,
  ): Promise<CompanyEmployeeContact | undefined>;
  findById(id: string): Promise<CompanyEmployeeContact | undefined>;
  save(data: CompanyEmployeeContact): Promise<CompanyEmployeeContact>;
  delete(data: CompanyEmployeeContact): Promise<void>;
}
