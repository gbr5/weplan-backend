import CompanyContact from '@modules/suppliers/infra/typeorm/entities/CompanyContact';
import ICreateCompanyContactDTO from '@modules/suppliers/dtos/ICreateCompanyContactDTO';

export default interface ICompanyContactsRepository {
  create(data: ICreateCompanyContactDTO): Promise<CompanyContact>;
  findByCompanyId(company_id: string): Promise<CompanyContact[]>;
  findByCompanyIdAndName(
    company_id: string,
    name: string,
  ): Promise<CompanyContact | undefined>;
  findById(id: string): Promise<CompanyContact | undefined>;
  save(supplier: CompanyContact): Promise<CompanyContact>;
  delete(employee: CompanyContact): Promise<void>;
}
