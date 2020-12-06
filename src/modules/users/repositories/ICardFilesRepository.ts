import CardFile from '@modules/users/infra/typeorm/entities/CardFile';
import ICreateCardFileDTO from '@modules/users/dtos/ICreateCardFileDTO';

export default interface ICardFilesRepository {
  create(data: ICreateCardFileDTO): Promise<CardFile>;
  findByCard(card_unique_name: string): Promise<CardFile[]>;
  findById(id: string): Promise<CardFile | undefined>;
  save(data: CardFile): Promise<CardFile>;
  delete(data: CardFile): Promise<void>;
}
