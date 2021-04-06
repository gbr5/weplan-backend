import CompanyInfo from '@modules/users/infra/typeorm/entities/CompanyInfo';
import ICreateCompanyInfoDTO from '@modules/users/dtos/ICreateCompanyInfoDTO';

export default interface ICompanyInfoRepository {
  findByUserId(id: string): Promise<CompanyInfo | undefined>;
  findByName(name: string): Promise<CompanyInfo | undefined>;
  create(data: ICreateCompanyInfoDTO): Promise<CompanyInfo>;
  save(companyInfo: CompanyInfo): Promise<CompanyInfo>;
}
