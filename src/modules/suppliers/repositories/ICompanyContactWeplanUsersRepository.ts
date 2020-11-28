import CompanyContactWeplanUser from '@modules/suppliers/infra/typeorm/entities/CompanyContactWeplanUser';
import ICreateCompanyContactWeplanUserDTO from '@modules/suppliers/dtos/ICreateCompanyContactWeplanUserDTO';

export default interface ICompanyContactWeplanUsersRepository {
  create(
    data: ICreateCompanyContactWeplanUserDTO,
  ): Promise<CompanyContactWeplanUser>;
  findByCompanyContactId(
    company_contact_id: string,
  ): Promise<CompanyContactWeplanUser | undefined>;
  findByUserId(user_id: string): Promise<CompanyContactWeplanUser[]>;
  findByContactIdAndWeplanUser(
    company_contact_id: string,
    user_id: string,
  ): Promise<CompanyContactWeplanUser | undefined>;
  findById(id: string): Promise<CompanyContactWeplanUser | undefined>;
  save(supplier: CompanyContactWeplanUser): Promise<CompanyContactWeplanUser>;
  delete(employee: CompanyContactWeplanUser): Promise<void>;
}
