export default interface ICreateEventInfoDTO {
  event_id: string;
  number_of_guests: number;
  start_hour: number;
  duration: number;
  budget: number;
  description: string;
  country: string;
  local_state: string;
  city: string;
}
