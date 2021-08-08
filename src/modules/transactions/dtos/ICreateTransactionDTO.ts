export default interface ICreateTransactionDTO {
  name: string;
  category: string | null;
  amount: number;
  due_date: Date;
  isPaid: boolean;
  payer_id: string;
  payee_id: string;
}
