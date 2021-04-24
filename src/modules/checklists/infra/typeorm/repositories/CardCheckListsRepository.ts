import { getRepository, Repository } from 'typeorm';

import ICardCheckListsRepository from '@modules/checklists/repositories/ICardCheckListsRepository';

import CardCheckList from '@modules/checklists/infra/typeorm/entities/CardCheckList';
import ICreateCardCheckListDTO from '@modules/checklists/dtos/ICreateCardCheckListDTO';

class CardCheckListsRepository implements ICardCheckListsRepository {
  private ormRepository: Repository<CardCheckList>;

  constructor() {
    this.ormRepository = getRepository(CardCheckList);
  }

  public async findById(id: string): Promise<CardCheckList | undefined> {
    const findCardCheckList = await this.ormRepository.findOne({ id });

    return findCardCheckList;
  }

  public async findByCardId(card_id: string): Promise<CardCheckList[]> {
    const checkListTasks = await this.ormRepository.find({
      where: { card_id },
    });

    return checkListTasks;
  }

  public async findByCardUniqueName(
    card_unique_name: string,
  ): Promise<CardCheckList[]> {
    const checkListTasks = await this.ormRepository.find({
      where: { card_unique_name },
    });

    return checkListTasks;
  }

  public async findByCheckListId(
    check_list_id: string,
  ): Promise<CardCheckList[]> {
    const checkListTasks = await this.ormRepository.find({
      where: { check_list_id },
    });

    return checkListTasks;
  }

  public async create(data: ICreateCardCheckListDTO): Promise<CardCheckList> {
    const checkListTask = await this.ormRepository.create(data);

    await this.ormRepository.save(checkListTask);

    return checkListTask;
  }

  public async save(checkListTask: CardCheckList): Promise<CardCheckList> {
    return this.ormRepository.save(checkListTask);
  }

  public async delete({ id }: CardCheckList): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default CardCheckListsRepository;
