import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEmployeeFilesRepository from '@modules/users/repositories/IEmployeeFilesRepository';
import EmployeeFile from '../infra/typeorm/entities/EmployeeFile';

@injectable()
class ListEmployeeFileService {
  constructor(
    @inject('EmployeeFilesRepository')
    private employeeFilesRepository: IEmployeeFilesRepository,
  ) {}

  public async execute(employee_id: string): Promise<EmployeeFile[]> {
    const employeeFiles = this.employeeFilesRepository.findByEmployeeId(
      employee_id,
    );

    return employeeFiles;
  }
}

export default ListEmployeeFileService;
