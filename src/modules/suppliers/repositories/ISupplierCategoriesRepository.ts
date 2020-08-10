import SupplierCategory from '@modules/suppliers/infra/typeorm/entities/SupplierCategory';
import ICreateSupplierCategoryDTO from '@modules/suppliers/dtos/ICreateSupplierCategoryDTO';

export default interface ISupplierCategoriesRepository {
  create(data: ICreateSupplierCategoryDTO): Promise<SupplierCategory>;
  findByCategoryName(category: string): Promise<SupplierCategory | undefined>;
  findAll(): Promise<SupplierCategory[]>;
  save(category: SupplierCategory): Promise<SupplierCategory>;
}
