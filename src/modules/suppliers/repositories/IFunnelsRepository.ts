import Funnel from '@modules/suppliers/infra/typeorm/entities/Funnel';
import ICreateFunnelDTO from '@modules/suppliers/dtos/ICreateFunnelDTO';

export default interface IFunnelsRepository {
  create(data: ICreateFunnelDTO): Promise<Funnel>;
  findById(id: string): Promise<Funnel | undefined>;
  findBySupplierId(supplier_id: string): Promise<Funnel[]>;
  save(funnel: Funnel): Promise<Funnel>;
  delete(funnel: Funnel): Promise<void>;
}
