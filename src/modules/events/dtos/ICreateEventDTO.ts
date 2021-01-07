export default interface ICreateEventDTO {
  isDateDefined: boolean;
  isPublished: boolean;
  name: string;
  trimmed_name: string;
  user_id: string;
  event_type: string;
  date: Date;
}
