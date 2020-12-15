export default interface ICreateEventMemberPaymentDTO {
  event_member_id: string;
  event_id: string;
  value: number;
  isPaid: boolean;
  description: string;
  due_date: Date;
}
