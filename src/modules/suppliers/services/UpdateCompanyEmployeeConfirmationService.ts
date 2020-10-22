import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyEmployeeConfirmationRepository from '@modules/suppliers/repositories/ICompanyEmployeeConfirmationRepository';

import CompanyEmployeeConfirmation from '@modules/suppliers/infra/typeorm/entities/CompanyEmployeeConfirmation';

interface IRequest {
  id: string;
  request_message: string;
  isConfirmed: boolean;
  salary: number;
}

@injectable()
class UpdateCompanyEmployeeConfirmationService {
  constructor(
    @inject('CompanyEmployeeConfirmationRepository')
    private companyEmployeeConfirmationRepository: ICompanyEmployeeConfirmationRepository,
  ) {}

  public async execute({
    id,
    request_message,
    isConfirmed,
    salary,
  }: IRequest): Promise<CompanyEmployeeConfirmation> {
    const companyEmployeeConfirmation = await this.companyEmployeeConfirmationRepository.findById(
      id,
    );

    if (!companyEmployeeConfirmation) {
      throw new AppError('CompanyEmployeeConfirmation not found.');
    }
    companyEmployeeConfirmation.request_message = request_message;
    companyEmployeeConfirmation.isConfirmed = isConfirmed;
    companyEmployeeConfirmation.salary = salary;

    const updatedCompanyEmployeeConfirmation = await this.companyEmployeeConfirmationRepository.save(
      companyEmployeeConfirmation,
    );

    return updatedCompanyEmployeeConfirmation;
  }
}

export default UpdateCompanyEmployeeConfirmationService;
