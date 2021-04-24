import ComercialCardResult from '@modules/suppliers/infra/typeorm/entities/ComercialCardResult';
import ICreateComercialCardResultsDTO from '@modules/suppliers/dtos/ICreateComercialCardResultsDTO';

export default interface IComercialCardResultsRepository {
  create(data: ICreateComercialCardResultsDTO): Promise<ComercialCardResult>;
  findById(id: string): Promise<ComercialCardResult | undefined>;
  findByCardId(card_id: string): Promise<ComercialCardResult | undefined>;
  save(card: ComercialCardResult): Promise<ComercialCardResult>;
  delete(card: ComercialCardResult): Promise<void>;
}
