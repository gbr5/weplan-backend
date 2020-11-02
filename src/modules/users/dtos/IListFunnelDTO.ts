import IFunnelStageDTO from './IListFunnelStageDTO';

export default interface IFunnelDTO {
  id: string;
  name: string;
  funnel_type: string;
  stages: IFunnelStageDTO[];
}
