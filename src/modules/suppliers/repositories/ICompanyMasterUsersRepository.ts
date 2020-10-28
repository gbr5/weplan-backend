import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';
import ICompanyMasterUserDTO from '@modules/suppliers/dtos/ICompanyMasterUserDTO';

export default interface ICompanyMasterUsersRepository {
  create(data: ICompanyMasterUserDTO): Promise<CompanyMasterUser>;
  findByCompanyId(company_id: string): Promise<CompanyMasterUser[]>;
  findByUserId(user_id: string): Promise<CompanyMasterUser[]>;
  findByUserIdAndCompanyId(
    user_id: string,
    company_id: string,
  ): Promise<CompanyMasterUser | undefined>;
  findById(id: string): Promise<CompanyMasterUser | undefined>;
  findByEmail(email: string): Promise<CompanyMasterUser | undefined>;
  save(supplier: CompanyMasterUser): Promise<CompanyMasterUser>;
  delete(user: CompanyMasterUser): Promise<void>;
}
