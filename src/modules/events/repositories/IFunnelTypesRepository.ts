import FunnelType from '@modules/events/infra/typeorm/entities/FunnelType';
import ICreateFunnelTypeDTO from '@modules/events/dtos/ICreateFunnelTypeDTO';

export default interface IFunnelTypesRepository {
  create(data: ICreateFunnelTypeDTO): Promise<FunnelType>;
  findByName(name: string): Promise<FunnelType | undefined>;
  findAll(): Promise<FunnelType[]>;
  save(funnelType: FunnelType): Promise<FunnelType>;
}
