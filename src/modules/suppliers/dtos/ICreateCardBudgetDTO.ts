export default interface ICreateCardBudgetDTO {
  customer_id: string;
  sales_person_id: string;
  company_id: string;
  card_unique_name: string;
  description: string;
  value: number;
  validity_date: Date;
  number_of_installments: number;
  isValid: boolean;
}
