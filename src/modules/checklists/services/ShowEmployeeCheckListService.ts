import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EmployeeCheckList from '@modules/checklists/infra/typeorm/entities/EmployeeCheckList';
import IEmployeeCheckListRepository from '@modules/checklists/repositories/IEmployeeCheckListRepository';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowEmployeeCheckListService {
  constructor(
    @inject('EmployeeCheckListRepository')
    private employeeCheckListRepository: IEmployeeCheckListRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(
    employee_id: string,
  ): Promise<EmployeeCheckList | undefined> {
    const employee = await this.companyEmployeesRepository.findById(
      employee_id,
    );
    if (!employee) throw new AppError('Employee not found!');
    const checkList = await this.employeeCheckListRepository.findByEmployeeId(
      employee_id,
    );

    return checkList;
  }
}

export default ShowEmployeeCheckListService;
