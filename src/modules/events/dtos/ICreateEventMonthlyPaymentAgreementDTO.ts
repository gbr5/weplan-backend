export default interface ICreateEventMonthlyPaymentAgreementDTO {
  event_id: string;
  name: string;
  monthly_payment: number;
  number_of_installments: number;
  start_date: Date;
}
