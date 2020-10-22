import CompanyEmployeeConfirmation from '@modules/suppliers/infra/typeorm/entities/CompanyEmployeeConfirmation';
import ICreateCompanyEmployeeConfirmationDTO from '@modules/suppliers/dtos/ICreateCompanyEmployeeConfirmationDTO';

export default interface ICompanyEmployeeConfirmationsRepository {
  create(
    data: ICreateCompanyEmployeeConfirmationDTO,
  ): Promise<CompanyEmployeeConfirmation>;
  findByCompanyEmployeeId(
    employee_id: string,
  ): Promise<CompanyEmployeeConfirmation | undefined>;
  findById(id: string): Promise<CompanyEmployeeConfirmation | undefined>;
  save(
    supplier: CompanyEmployeeConfirmation,
  ): Promise<CompanyEmployeeConfirmation>;
  delete(employee: CompanyEmployeeConfirmation): Promise<void>;
}
