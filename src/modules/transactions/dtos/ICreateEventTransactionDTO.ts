export default interface ICreateEventTransactionDTO {
  main_transaction_id: string;
  event_id: string;
  transaction_type: string;
  weplanUser: string;
  weplanUserType: string;
  description: string;
}
