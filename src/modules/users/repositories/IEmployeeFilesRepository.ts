import EmployeeFile from '@modules/users/infra/typeorm/entities/EmployeeFile';
import ICreateEmployeeFileDTO from '@modules/users/dtos/ICreateEmployeeFileDTO';

export default interface IEmployeeFilesRepository {
  create(data: ICreateEmployeeFileDTO): Promise<EmployeeFile>;
  findByEmployeeId(employee_id: string): Promise<EmployeeFile[]>;
  findById(id: string): Promise<EmployeeFile | undefined>;
  save(data: EmployeeFile): Promise<EmployeeFile>;
  delete(data: EmployeeFile): Promise<void>;
}
