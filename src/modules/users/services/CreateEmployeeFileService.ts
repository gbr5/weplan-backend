import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEmployeeFilesRepository from '@modules/users/repositories/IEmployeeFilesRepository';
import EmployeeFile from '@modules/users/infra/typeorm/entities/EmployeeFile';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICreateEmployeeFileDTO from '../dtos/ICreateEmployeeFileDTO';
import IUserFilesRepository from '../repositories/IUserFilesRepository';

@injectable()
class CreateEmployeeFileService {
  constructor(
    @inject('EmployeeFilesRepository')
    private employeeFilesRepository: IEmployeeFilesRepository,

    @inject('CompanyEmployeesRepository')
    private companycmployeesRepository: ICompanyEmployeesRepository,

    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,
  ) {}

  public async execute({
    employee_id,
    file_id,
  }: ICreateEmployeeFileDTO): Promise<EmployeeFile> {
    const cmployeeExists = await this.companycmployeesRepository.findById(
      employee_id,
    );

    if (!cmployeeExists) {
      throw new AppError('Employee not found!');
    }

    const fileExists = await this.userFilesRepository.findById(file_id);

    if (!fileExists) {
      throw new AppError('File not found!');
    }

    const file = await this.employeeFilesRepository.create({
      employee_id,
      file_id,
    });

    return file;
  }
}

export default CreateEmployeeFileService;
