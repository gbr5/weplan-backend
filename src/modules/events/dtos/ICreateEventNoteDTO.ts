export default interface ICreateEventNoteDTO {
  event_id: string;
  user_id: string;
  access: string;
  note: string;
  color: string;
  isActive: boolean;
}
