import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyEmployeeContact from '@modules/suppliers/infra/typeorm/entities/CompanyEmployeeContact';
import ICompanyEmployeeContactRepository from '@modules/suppliers/repositories/ICompanyEmployeeContactRepository';
import ICreateCompanyEmployeeContactDTO from '../dtos/ICreateCompanyEmployeeContactDTO';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';
import ICompanyEmployeesRepository from '../repositories/ICompanyEmployeesRepository';

@injectable()
class CreateCompanyEmployeeContactService {
  constructor(
    @inject('CompanyEmployeeContactRepository')
    private companyEmployeeContactRepository: ICompanyEmployeeContactRepository,

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    company_contact_id,
    employee_id,
  }: ICreateCompanyEmployeeContactDTO): Promise<CompanyEmployeeContact> {
    const companyContactExists = await this.companyContactsRepository.findById(
      company_contact_id,
    );

    if (!companyContactExists) {
      throw new AppError('Company Contact not found!');
    }

    const companyEmployeeExists = await this.companyEmployeesRepository.findById(
      employee_id,
    );

    if (!companyEmployeeExists) {
      throw new AppError('Employee not found!');
    }

    if (companyEmployeeExists.employeeContact) {
      throw new AppError('Employee already have a contact associated with it!');
    }

    const employeeContact = await this.companyEmployeeContactRepository.create({
      company_contact_id,
      employee_id,
    });

    return employeeContact;
  }
}

export default CreateCompanyEmployeeContactService;
