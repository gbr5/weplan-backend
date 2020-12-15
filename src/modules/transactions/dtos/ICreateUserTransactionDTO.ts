export default interface ICreateUserTransactionDTO {
  main_transaction_id: string;
  user_id: string;
  transaction_type: string;
  weplanUser: string;
  weplanUserType: string;
  description: string;
}
