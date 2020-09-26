export default interface ITransactionDTO {
  agreement_id: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
}
