import { getRepository, Repository } from 'typeorm';

import ICompanyEmployeeConfirmationRepository from '@modules/suppliers/repositories/ICompanyEmployeeConfirmationRepository';
import ICreateCompanyEmployeeConfirmationDTO from '@modules/suppliers/dtos/ICreateCompanyEmployeeConfirmationDTO';

import CompanyEmployeeConfirmation from '@modules/suppliers/infra/typeorm/entities/CompanyEmployeeConfirmation';
import AppError from '@shared/errors/AppError';

class CompanyEmployeeConfirmationRepository
  implements ICompanyEmployeeConfirmationRepository {
  private ormRepository: Repository<CompanyEmployeeConfirmation>;

  constructor() {
    this.ormRepository = getRepository(CompanyEmployeeConfirmation);
  }

  public async findByCompanyEmployeeId(
    company_employee_id: string,
  ): Promise<CompanyEmployeeConfirmation | undefined> {
    const findCompanyEmployeeConfirmation = await this.ormRepository.findOne({
      where: { company_employee_id },
    });

    return findCompanyEmployeeConfirmation;
  }

  public async findById(
    id: string,
  ): Promise<CompanyEmployeeConfirmation | undefined> {
    const employee = await this.ormRepository.findOne(id);

    return employee;
  }

  public async create({
    company_employee_id,
    request_message,
    isConfirmed,
    salary,
  }: ICreateCompanyEmployeeConfirmationDTO): Promise<
    CompanyEmployeeConfirmation
  > {
    try {
      const companyEmployeeConfirmation = this.ormRepository.create({
        company_employee_id,
        request_message,
        isConfirmed,
        salary,
      });

      await this.ormRepository.save(companyEmployeeConfirmation);

      return companyEmployeeConfirmation;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyEmployeeConfirmationRepository.create',
      );
    }
  }

  public async save(
    employee: CompanyEmployeeConfirmation,
  ): Promise<CompanyEmployeeConfirmation> {
    try {
      return this.ormRepository.save(employee);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyEmployeeConfirmationRepository.save',
      );
    }
  }

  public async delete(employee: CompanyEmployeeConfirmation): Promise<void> {
    try {
      await this.ormRepository.delete(employee.id);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyEmployeeConfirmationRepository.delete',
      );
    }
  }
}

export default CompanyEmployeeConfirmationRepository;
