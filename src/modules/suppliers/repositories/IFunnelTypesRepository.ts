import FunnelType from '@modules/suppliers/infra/typeorm/entities/FunnelType';
import ICreateFunnelTypeDTO from '@modules/suppliers/dtos/ICreateFunnelTypeDTO';

export default interface IFunnelTypesRepository {
  create(data: ICreateFunnelTypeDTO): Promise<FunnelType>;
  findByName(name: string): Promise<FunnelType | undefined>;
  findAll(): Promise<FunnelType[]>;
  save(funnelType: FunnelType): Promise<FunnelType>;
}
