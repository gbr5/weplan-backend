export default interface ICreateMultipleTransactionsDTO {
  agreement_id: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
}
