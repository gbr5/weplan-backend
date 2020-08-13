export default interface ICreateFunnelDTO {
  weplanEvent: boolean;
  name: string;
  unique_name: string;
  isActive: boolean;
  stage_id: string;
  card_owner: string;
}
