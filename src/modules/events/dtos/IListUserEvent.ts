export default interface IListUserEvent {
  id: string;
  name: string;
  trimmed_name: string;
  isOwner: boolean;
  owner_master: string;
  isGuest: boolean;
  event_type: string;
  date: Date;
}
