import IStageCardDTO from './IListStageCardDTO';

export default interface IFunnelStageDTO {
  id: string;
  name: string;
  funnel_order: number;
  cards: IStageCardDTO[];
}
