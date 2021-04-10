import { getRepository, Repository } from 'typeorm';

import ICompanyEmployeeContactRepository from '@modules/suppliers/repositories/ICompanyEmployeeContactRepository';
import ICreateCompanyEmployeeContactDTO from '@modules/suppliers/dtos/ICreateCompanyEmployeeContactDTO';

import CompanyEmployeeContact from '@modules/suppliers/infra/typeorm/entities/CompanyEmployeeContact';
import AppError from '@shared/errors/AppError';

class CompanyEmployeeContactRepository
  implements ICompanyEmployeeContactRepository {
  private ormRepository: Repository<CompanyEmployeeContact>;

  constructor() {
    this.ormRepository = getRepository(CompanyEmployeeContact);
  }

  public async findByCompanyContactId(
    company_contact_id: string,
  ): Promise<CompanyEmployeeContact | undefined> {
    const findCompanyEmployee = await this.ormRepository.findOne({
      where: { company_contact_id },
    });

    return findCompanyEmployee;
  }

  public async findByEmployeeId(
    employee_id: string,
  ): Promise<CompanyEmployeeContact | undefined> {
    const findCompanyEmployee = await this.ormRepository.findOne({
      where: { employee_id },
    });

    return findCompanyEmployee;
  }

  public async findById(
    id: string,
  ): Promise<CompanyEmployeeContact | undefined> {
    const employee = await this.ormRepository.findOne(id);

    return employee;
  }

  public async create(
    data: ICreateCompanyEmployeeContactDTO,
  ): Promise<CompanyEmployeeContact> {
    try {
      const companyEmployee = this.ormRepository.create(data);

      await this.ormRepository.save(companyEmployee);

      return companyEmployee;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CompanyEmployeeRepository.create',
        err,
      );
    }
  }

  public async save(
    employee: CompanyEmployeeContact,
  ): Promise<CompanyEmployeeContact> {
    return this.ormRepository.save(employee);
  }

  public async delete(employee: CompanyEmployeeContact): Promise<void> {
    try {
      await this.ormRepository.delete(employee.id);
    } catch (err) {
      throw new AppError('Algo deu errado, CompanyEmployeeRepository.delete');
    }
  }
}

export default CompanyEmployeeContactRepository;
