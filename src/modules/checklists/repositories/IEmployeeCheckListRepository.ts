import EmployeeCheckList from '@modules/checklists/infra/typeorm/entities/EmployeeCheckList';
import ICreateEmployeeCheckListDTO from '@modules/checklists/dtos/ICreateEmployeeCheckListDTO';

export default interface IEmployeeCheckListRepository {
  create(data: ICreateEmployeeCheckListDTO): Promise<EmployeeCheckList>;
  findById(id: string): Promise<EmployeeCheckList | undefined>;
  findByEmployeeId(id: string): Promise<EmployeeCheckList | undefined>;
  save(card: EmployeeCheckList): Promise<EmployeeCheckList>;
  delete(card: EmployeeCheckList): Promise<void>;
}
