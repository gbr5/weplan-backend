import UserSupplierCategory from '@modules/suppliers/infra/typeorm/entities/UserSupplierCategory';
import ICreateUserSupplierCategoryDTO from '@modules/suppliers/dtos/ICreateUserSupplierCategoryDTO';

export default interface IUserSupplierCategorysRepository {
  create(data: ICreateUserSupplierCategoryDTO): Promise<UserSupplierCategory>;
  findByIdAndCategory(
    user_id: string,
    sub_category_name: string,
  ): Promise<UserSupplierCategory | undefined>;
  findByCategory(sub_category_name: string): Promise<UserSupplierCategory[]>;
  save(supplier: UserSupplierCategory): Promise<UserSupplierCategory>;
  delete(data: ICreateUserSupplierCategoryDTO): Promise<void>;
}
