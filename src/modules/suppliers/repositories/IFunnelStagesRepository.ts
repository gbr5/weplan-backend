import FunnelStage from '@modules/suppliers/infra/typeorm/entities/FunnelStage';
import ICreateFunnelStageDTO from '@modules/suppliers/dtos/ICreateFunnelStageDTO';

export default interface IFunnelStagesRepository {
  create(data: ICreateFunnelStageDTO): Promise<FunnelStage>;
  findById(id: string): Promise<FunnelStage | undefined>;
  findByFunnelIdAndOrder(
    funnel_id: string,
    funnel_order: number,
  ): Promise<FunnelStage | undefined>;
  findByFunnelId(funnel_id: string): Promise<FunnelStage[]>;
  save(funnelStage: FunnelStage): Promise<FunnelStage>;
  delete(funnelStage: FunnelStage): Promise<void>;
}
