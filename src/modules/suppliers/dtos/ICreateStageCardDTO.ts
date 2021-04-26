export default interface ICreateFunnelDTO {
  weplanEvent: boolean;
  name: string;
  value: number;
  unique_name: string;
  isActive: boolean;
  stage_id: string;
  card_owner: string;
}
