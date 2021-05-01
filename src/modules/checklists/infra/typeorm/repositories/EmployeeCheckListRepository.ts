import { getRepository, Repository } from 'typeorm';

import IEmployeeCheckListRepository from '@modules/checklists/repositories/IEmployeeCheckListRepository';

import EmployeeCheckList from '@modules/checklists/infra/typeorm/entities/EmployeeCheckList';
import ICreateEmployeeCheckListDTO from '@modules/checklists/dtos/ICreateEmployeeCheckListDTO';

class EmployeeCheckListRepository implements IEmployeeCheckListRepository {
  private ormRepository: Repository<EmployeeCheckList>;

  constructor() {
    this.ormRepository = getRepository(EmployeeCheckList);
  }

  public async findById(id: string): Promise<EmployeeCheckList | undefined> {
    const findEmployeeCheckList = await this.ormRepository.findOne({ id });

    return findEmployeeCheckList;
  }

  public async findByEmployeeId(
    employee_id: string,
  ): Promise<EmployeeCheckList | undefined> {
    const findEmployeeCheckList = await this.ormRepository.findOne({
      where: { employee_id },
    });

    return findEmployeeCheckList;
  }

  public async create(
    data: ICreateEmployeeCheckListDTO,
  ): Promise<EmployeeCheckList> {
    const checkListTask = await this.ormRepository.create(data);

    await this.ormRepository.save(checkListTask);

    return checkListTask;
  }

  public async save(
    checkListTask: EmployeeCheckList,
  ): Promise<EmployeeCheckList> {
    return this.ormRepository.save(checkListTask);
  }

  public async delete({ id }: EmployeeCheckList): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default EmployeeCheckListRepository;
