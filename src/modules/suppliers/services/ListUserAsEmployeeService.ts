import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class ListUserAsEmployeeService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(employee_id: string): Promise<CompanyEmployee[]> {
    const employee = await this.companyEmployeesRepository.findById(
      employee_id,
    );

    if (!employee) {
      throw new AppError('Employee not found');
    }

    const userAsEmployee = await this.companyEmployeesRepository.findByEmployeeId(
      employee.employeeUser.id,
    );

    return userAsEmployee;
  }
}

export default ListUserAsEmployeeService;
