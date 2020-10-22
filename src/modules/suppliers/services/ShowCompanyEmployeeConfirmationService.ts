import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyEmployeeConfirmation from '@modules/suppliers/infra/typeorm/entities/CompanyEmployeeConfirmation';
import ICompanyEmployeeConfirmationRepository from '@modules/suppliers/repositories/ICompanyEmployeeConfirmationRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ShowCompanyEmployeeConfirmation {
  constructor(
    @inject('CompanyEmployeeConfirmationRepository')
    private companyEmployeeConfirmationRepository: ICompanyEmployeeConfirmationRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(
    employee_id: string,
  ): Promise<CompanyEmployeeConfirmation | undefined> {
    const companyEmployeeConfirmation = await this.companyEmployeeConfirmationRepository.findByCompanyEmployeeId(
      employee_id,
    );

    return companyEmployeeConfirmation;
  }
}

export default ShowCompanyEmployeeConfirmation;
