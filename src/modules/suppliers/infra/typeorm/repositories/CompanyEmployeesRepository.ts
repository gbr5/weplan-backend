import { getRepository, Repository } from 'typeorm';

import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICreateCompanyEmployeeDTO from '@modules/suppliers/dtos/ICreateCompanyEmployeeDTO';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import AppError from '@shared/errors/AppError';

interface IRequest {
  employee_id: string;
  company_id: string;
}

class CompanyEmployeeRepository implements ICompanyEmployeesRepository {
  private ormRepository: Repository<CompanyEmployee>;

  constructor() {
    this.ormRepository = getRepository(CompanyEmployee);
  }

  public async findByCompanyId(company_id: string): Promise<CompanyEmployee[]> {
    const findCompanyEmployee = await this.ormRepository.find({
      where: { company_id },
    });

    return findCompanyEmployee;
  }

  public async findById(id: string): Promise<CompanyEmployee | undefined> {
    const employee = await this.ormRepository.findOne(id);

    return employee;
  }

  public async findByEmployeeIdAndCompanyId(
    employee_id: string,
    company_id: string,
  ): Promise<CompanyEmployee | undefined> {
    try {
      const findCompanyEmployee = await this.ormRepository.findOne({
        where: {
          employee_id,
          company_id,
        },
      });
      return findCompanyEmployee;
    } catch (err) {
      return undefined;
    }
  }

  public async create({
    employee_id,
    company_id,
    position,
  }: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee> {
    try {
      const companyEmployee = this.ormRepository.create({
        employee_id,
        company_id,
        position,
      });

      await this.ormRepository.save(companyEmployee);

      return companyEmployee;
    } catch (err) {
      throw new AppError('Algo deu errado, CompanyEmployeeRepository.create');
    }
  }

  public async save(employee: CompanyEmployee): Promise<CompanyEmployee> {
    try {
      return this.ormRepository.save(employee);
    } catch (err) {
      throw new AppError('Algo deu errado, CompanyEmployeeRepository.save');
    }
  }

  public async delete(employee: CompanyEmployee): Promise<void> {
    try {
      await this.ormRepository.delete(employee.id);
    } catch (err) {
      throw new AppError('Algo deu errado, CompanyEmployeeRepository.delete');
    }
  }
}

export default CompanyEmployeeRepository;
