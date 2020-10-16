import SupplierProduct from '@modules/suppliers/infra/typeorm/entities/SupplierProduct';
import ICreateSupplierProductDTO from '@modules/suppliers/dtos/ICreateSupplierProductDTO';

export default interface ISupplierProductRepository {
  create(data: ICreateSupplierProductDTO): Promise<SupplierProduct>;
  findById(id: string): Promise<SupplierProduct | undefined>;
  findBySupplierId(sub_category_name: string): Promise<SupplierProduct[]>;
  findBySupplierAndCategoryAndEventTypeId(
    user_id: string,
    sub_category_id: string,
    event_type_id: string,
  ): Promise<SupplierProduct | undefined>;
  save(supplier: SupplierProduct): Promise<SupplierProduct>;
  delete(id: string): Promise<void>;
}
