import CompanyContactInfo from '@modules/suppliers/infra/typeorm/entities/CompanyContactInfo';
import ICreateCompanyContactInfoDTO from '@modules/suppliers/dtos/ICreateCompanyContactInfoDTO';

export default interface ICompanyContactInfosRepository {
  create(data: ICreateCompanyContactInfoDTO): Promise<CompanyContactInfo>;
  findByCompanyContactId(
    company_contact_id: string,
  ): Promise<CompanyContactInfo[]>;
  findByContactIdAndInfo(
    company_contact_id: string,
    info: string,
  ): Promise<CompanyContactInfo | undefined>;
  findById(id: string): Promise<CompanyContactInfo | undefined>;
  save(supplier: CompanyContactInfo): Promise<CompanyContactInfo>;
  delete(employee: CompanyContactInfo): Promise<void>;
}
