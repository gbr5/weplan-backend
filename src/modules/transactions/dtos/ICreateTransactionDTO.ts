export default interface ICreateTransactionDTO {
  name: string;
  category: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
  payer_id: string;
  payee_id: string;
}
