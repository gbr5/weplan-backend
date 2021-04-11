import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICompanyEmployeeContactRepository from '@modules/suppliers/repositories/ICompanyEmployeeContactRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '../repositories/ICompanyEmployeesRepository';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';
import CompanyContact from '../infra/typeorm/entities/CompanyContact';

@injectable()
class ShowCompanyEmployeeContactByEmployeeIDService {
  constructor(
    @inject('CompanyEmployeeContactRepository')
    private companyEmployeeContactRepository: ICompanyEmployeeContactRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,
  ) {}

  public async execute(employee_id: string): Promise<CompanyContact> {
    const companyEmployeeContact = await this.companyEmployeeContactRepository.findByEmployeeId(
      employee_id,
    );

    if (companyEmployeeContact === undefined) {
      throw new AppError('Company employee contact not found!');
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

    return companyContact;
  }
}

export default ShowCompanyEmployeeContactByEmployeeIDService;
