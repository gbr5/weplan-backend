import { injectable, inject } from 'tsyringe';

import EmployeeCheckList from '@modules/checklists/infra/typeorm/entities/EmployeeCheckList';
import IEmployeeCheckListRepository from '@modules/checklists/repositories/IEmployeeCheckListRepository';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICompanyEmployeeContactsRepository from '@modules/suppliers/repositories/ICompanyEmployeeContactRepository';
import AppError from '@shared/errors/AppError';
import ICheckListsRepository from '../repositories/ICheckListsRepository';

@injectable()
class CreateEmployeeCheckListService {
  constructor(
    @inject('EmployeeCheckListRepository')
    private employeeCheckListRepository: IEmployeeCheckListRepository,

    @inject('CheckListsRepository')
    private checkListsRepository: ICheckListsRepository,

    @inject('CompanyEmployeeContactRepository')
    private companyEmployeeContactsRepository: ICompanyEmployeeContactsRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(employee_id: string): Promise<EmployeeCheckList> {
    const findEmployee = await this.companyEmployeesRepository.findById(
      employee_id,
    );
    if (!findEmployee) throw new AppError('Employee not found!');
    const findEmployeeCheckList = await this.employeeCheckListRepository.findByEmployeeId(
      employee_id,
    );
    if (findEmployeeCheckList)
      throw new AppError('This employee already have a check list');
    const findEmployeeContact = await this.companyEmployeeContactsRepository.findByEmployeeId(
      employee_id,
    );

    const checkList = await this.checkListsRepository.create({
      color: 'transparent',
      due_date: String(new Date()),
      isActive: true,
      name: `Tarefas | Colaborador ${
        findEmployeeContact && findEmployeeContact.companyContact
          ? findEmployeeContact.companyContact.name
          : findEmployee.email
      } ${
        findEmployeeContact && findEmployeeContact.companyContact
          ? findEmployeeContact.companyContact.family_name
          : ''
      }`,
      priority: 'high',
      user_id: findEmployee.company_id,
    });
    const employeeCheckList = await this.employeeCheckListRepository.create({
      employee_id,
      check_list_id: checkList.id,
    });

    return employeeCheckList;
  }
}

export default CreateEmployeeCheckListService;
