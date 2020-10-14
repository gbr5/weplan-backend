import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICreateCompanyEmployeeDTO from '@modules/suppliers/dtos/ICreateCompanyEmployeeDTO';

export default interface ICompanyEmployeesRepository {
  create(data: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee>;
  findByCompanyId(company_id: string): Promise<CompanyEmployee[]>;
  findByEmployeeIdAndCompanyId(
    employee_id: string,
    company_id: string,
  ): Promise<CompanyEmployee | undefined>;
  findById(id: string): Promise<CompanyEmployee | undefined>;
  save(supplier: CompanyEmployee): Promise<CompanyEmployee>;
  delete(employee: CompanyEmployee): Promise<void>;
}
