export default interface ICreateTransactionDTO {
  amount: number;
  due_date: Date;
  isPaid: boolean;
  payer_id: string;
  payee_id: string;
}
