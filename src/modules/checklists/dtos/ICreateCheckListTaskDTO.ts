export default interface ICreateCheckListTaskDTO {
  owner_id: string;
  check_list_id: string;
  task: string;
  color: string;
  isActive: boolean;
  priority: string;
  status: string;
  due_date: string;
}
