import { getRepository, Repository } from 'typeorm';

import IEmployeeFilesRepository from '@modules/users/repositories/IEmployeeFilesRepository';
import ICreateEmployeeFileDTO from '@modules/users/dtos/ICreateEmployeeFileDTO';

import EmployeeFile from '@modules/users/infra/typeorm/entities/EmployeeFile';
import AppError from '@shared/errors/AppError';

class EmployeeFilesRepository implements IEmployeeFilesRepository {
  private ormRepository: Repository<EmployeeFile>;

  constructor() {
    this.ormRepository = getRepository(EmployeeFile);
  }

  public async findByEmployeeId(employee_id: string): Promise<EmployeeFile[]> {
    const findEmployeeFile = await this.ormRepository.find({
      where: { employee_id },
    });

    return findEmployeeFile;
  }

  public async findById(id: string): Promise<EmployeeFile | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(data: ICreateEmployeeFileDTO): Promise<EmployeeFile> {
    try {
      const employeeFile = this.ormRepository.create(data);

      await this.ormRepository.save(employeeFile);

      return employeeFile;
    } catch (err) {
      throw new AppError('Algo deu errado, EmployeeFilesRepository.create');
    }
  }

  public async save(data: EmployeeFile): Promise<EmployeeFile> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, EmployeeFilesRepository.save');
    }
  }

  public async delete(data: EmployeeFile): Promise<void> {
    try {
      await this.ormRepository.delete(data.id);
    } catch (err) {
      throw new AppError('Algo deu errado, EmployeeFilesRepository.delete');
    }
  }
}

export default EmployeeFilesRepository;
