export default interface IFriendsEventDTO {
  guest_id: string;
  event_name: string;
  host: string;
  date: Date;
  confirmed: boolean;
}
