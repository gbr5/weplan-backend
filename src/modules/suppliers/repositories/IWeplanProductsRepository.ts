import WeplanProduct from '@modules/suppliers/infra/typeorm/entities/WeplanProduct';
import ICreateWeplanProductDTO from '@modules/suppliers/dtos/ICreateWeplanProductDTO';

interface IFindProducts {
  id: string;
}
export default interface IWeplanProductsRepository {
  create(data: ICreateWeplanProductDTO): Promise<WeplanProduct>;
  findById(id: string): Promise<WeplanProduct | undefined>;
  findByAllById(products: IFindProducts[]): Promise<WeplanProduct[]>;
  findByName(name: string): Promise<WeplanProduct | undefined>;
  findAll(): Promise<WeplanProduct[]>;
  save(weplanManagementModule: WeplanProduct): Promise<WeplanProduct>;
  delete(id: string): Promise<void>;
}
