import CustomerServiceOrderFieldAnswer from '@modules/suppliers/infra/typeorm/entities/CustomerServiceOrderFieldAnswer';
import ICreateCustomerServiceOrderFieldAnswerDTO from '@modules/suppliers/dtos/ICreateCustomerServiceOrderFieldAnswerDTO';

export default interface ICustomerServiceOrderFieldAnswersRepository {
  create(
    data: ICreateCustomerServiceOrderFieldAnswerDTO,
  ): Promise<CustomerServiceOrderFieldAnswer>;
  findByCompanyDefaultServiceOrderFieldAndCustomerServiceOrder(
    customer_service_order_id: string,
    company_default_service_order_field_id: string,
  ): Promise<CustomerServiceOrderFieldAnswer | undefined>;
  findByCustomerServiceOrderId(
    customer_service_order_id: string,
  ): Promise<CustomerServiceOrderFieldAnswer[]>;
  findById(id: string): Promise<CustomerServiceOrderFieldAnswer | undefined>;
  save(
    data: CustomerServiceOrderFieldAnswer,
  ): Promise<CustomerServiceOrderFieldAnswer>;
  delete(data: CustomerServiceOrderFieldAnswer): Promise<void>;
}
