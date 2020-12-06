import CategoryFile from '@modules/users/infra/typeorm/entities/CategoryFile';
import ICreateCategoryFileDTO from '@modules/users/dtos/ICreateCategoryFileDTO';

export default interface ICategoryFilesRepository {
  create(data: ICreateCategoryFileDTO): Promise<CategoryFile>;
  findByCategoryId(category_id: string): Promise<CategoryFile[]>;
  findById(id: string): Promise<CategoryFile | undefined>;
  save(data: CategoryFile): Promise<CategoryFile>;
  delete(data: CategoryFile): Promise<void>;
}
