import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

interface IParticipant {
  participant_id: string;
  participant_type: string;
  transactions: ICreateTransactionDTO[];
}

export default interface ICreateEventParticipantsMonthlyPaymentAgreementsDTO {
  event_id: string;
  name: string;
  monthly_payment: number;
  number_of_installments: number;
  start_date: Date;
  amount: number;
  participants: IParticipant[];
}
