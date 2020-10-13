export default interface ICreateUserCheckListDTO {
  name: string;
  priority_level: number;
  status: number;
  due_date: Date;
  event_id: string;
}
