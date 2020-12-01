import CustomerServiceOrder from '@modules/suppliers/infra/typeorm/entities/CustomerServiceOrder';
import ICreateCustomerServiceOrderDTO from '@modules/suppliers/dtos/ICreateCustomerServiceOrderDTO';

export default interface ICustomerServiceOrdersRepository {
  create(data: ICreateCustomerServiceOrderDTO): Promise<CustomerServiceOrder>;
  findByCompanyId(company_id: string): Promise<CustomerServiceOrder[]>;
  findByCustomerId(customer_id: string): Promise<CustomerServiceOrder[]>;
  findById(id: string): Promise<CustomerServiceOrder | undefined>;
  save(data: CustomerServiceOrder): Promise<CustomerServiceOrder>;
  delete(data: CustomerServiceOrder): Promise<void>;
}
