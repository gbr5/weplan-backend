import SupplierSubCategory from '@modules/suppliers/infra/typeorm/entities/SupplierSubCategory';
import ICreateSupplierSubCategoryDTO from '@modules/suppliers/dtos/ICreateSupplierSubCategoryDTO';

export default interface ISupplierCategoriesRepository {
  create(data: ICreateSupplierSubCategoryDTO): Promise<SupplierSubCategory>;
  findBySubCategoryName(
    sub_category: string,
  ): Promise<SupplierSubCategory | undefined>;
  findAll(): Promise<SupplierSubCategory[]>;
  save(sub_category: SupplierSubCategory): Promise<SupplierSubCategory>;
}