export default interface ICreateTaskDTO {
  user_id: string;
  title: string;
  status: string;
  priority: string;
  due_date: Date;
}
