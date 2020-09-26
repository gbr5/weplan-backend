import ITransaction from './ITransactionDTO';

export default interface ICreateTransactionAgreementDTO {
  supplier_id: string;
  amount: number;
  number_of_installments: number;
  transactions: ITransaction[];
}
