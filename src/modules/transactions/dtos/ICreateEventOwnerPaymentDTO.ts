export default interface ICreateEventOwnerPaymentDTO {
  event_owner_id: string;
  event_id: string;
  value: number;
  isPaid: boolean;
  description: string;
  due_date: Date;
}
