export default interface ICreateTransactionDTO {
  agreement_id: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
}
