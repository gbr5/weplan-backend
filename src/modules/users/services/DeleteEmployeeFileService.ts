import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEmployeeFilesRepository from '@modules/users/repositories/IEmployeeFilesRepository';

@injectable()
class DeleteEmployeeFileService {
  constructor(
    @inject('EmployeeFilesRepository')
    private employeeFilesRepository: IEmployeeFilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const employeeFile = await this.employeeFilesRepository.findById(id);

    if (!employeeFile) {
      throw new AppError('No confirmation found.');
    }

    await this.employeeFilesRepository.delete(employeeFile);
  }
}

export default DeleteEmployeeFileService;
