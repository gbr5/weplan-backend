import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICompanyEmployeeContactRepository from '@modules/suppliers/repositories/ICompanyEmployeeContactRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '../repositories/ICompanyEmployeesRepository';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';
import CompanyEmployee from '../infra/typeorm/entities/CompanyEmployee';

@injectable()
class ShowCompanyEmployeeContactService {
  constructor(
    @inject('CompanyEmployeeContactRepository')
    private companyEmployeeContactRepository: ICompanyEmployeeContactRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,
  ) {}

  public async execute(
    company_contact_id: string,
  ): Promise<CompanyEmployee | undefined> {
    const companyEmployeeContact = await this.companyEmployeeContactRepository.findByCompanyContactId(
      company_contact_id,
    );

    if (companyEmployeeContact === undefined) {
      return undefined;
    }
    const employee = await this.companyEmployeesRepository.findById(
      companyEmployeeContact.employee_id,
    );
    const companyContact = await this.companyContactsRepository.findById(
      companyEmployeeContact.company_contact_id,
    );

    if (employee === undefined || companyContact === undefined) {
      throw new AppError('Company employee contact not found!');
    }

    return employee;
  }
}

export default ShowCompanyEmployeeContactService;
