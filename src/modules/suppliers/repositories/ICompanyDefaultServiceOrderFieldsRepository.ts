import CompanyDefaultServiceOrderField from '@modules/suppliers/infra/typeorm/entities/CompanyDefaultServiceOrderField';
import ICreateCompanyDefaultServiceOrderFieldDTO from '@modules/suppliers/dtos/ICreateCompanyDefaultServiceOrderFieldDTO';

export default interface ICompanyDefaultServiceOrderFieldsRepository {
  create(
    data: ICreateCompanyDefaultServiceOrderFieldDTO,
  ): Promise<CompanyDefaultServiceOrderField>;
  findByCompanyId(
    company_id: string,
  ): Promise<CompanyDefaultServiceOrderField[]>;
  findByCompanyIdAndFieldName(
    company_id: string,
    field_name: string,
  ): Promise<CompanyDefaultServiceOrderField | undefined>;
  findById(id: string): Promise<CompanyDefaultServiceOrderField | undefined>;
  save(
    data: CompanyDefaultServiceOrderField,
  ): Promise<CompanyDefaultServiceOrderField>;
  delete(data: CompanyDefaultServiceOrderField): Promise<void>;
}
