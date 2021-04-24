import CardCheckList from '@modules/checklists/infra/typeorm/entities/CardCheckList';
import ICreateCardCheckListDTO from '@modules/checklists/dtos/ICreateCardCheckListDTO';

export default interface ICardCheckListsRepository {
  create(data: ICreateCardCheckListDTO): Promise<CardCheckList>;
  findById(id: string): Promise<CardCheckList | undefined>;
  findByCardId(card_id: string): Promise<CardCheckList[]>;
  findByCardUniqueName(card_unique_name: string): Promise<CardCheckList[]>;
  findByCheckListId(check_list_id: string): Promise<CardCheckList[]>;
  save(card: CardCheckList): Promise<CardCheckList>;
  delete(card: CardCheckList): Promise<void>;
}
