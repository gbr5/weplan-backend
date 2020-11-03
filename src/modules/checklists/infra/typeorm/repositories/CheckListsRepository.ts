import { getRepository, Repository } from 'typeorm';

import ICheckListsRepository from '@modules/checklists/repositories/ICheckListsRepository';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import ICreateCheckListDTO from '@modules/checklists/dtos/ICreateCheckListDTO';

class CheckListsRepository implements ICheckListsRepository {
  private ormRepository: Repository<CheckList>;

  constructor() {
    this.ormRepository = getRepository(CheckList);
  }

  public async findById(id: string): Promise<CheckList | undefined> {
    const findCheckList = await this.ormRepository.findOne({ id });

    return findCheckList;
  }

  public async findByUserId(user_id: string): Promise<CheckList[]> {
    const checkLists = await this.ormRepository.find({
      where: { user_id },
    });

    return checkLists;
  }

  public async create(data: ICreateCheckListDTO): Promise<CheckList> {
    const checkList = await this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(checkList: CheckList): Promise<CheckList> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id, user_id }: CheckList): Promise<void> {
    await this.ormRepository.delete({ id, user_id });
  }
}

export default CheckListsRepository;
