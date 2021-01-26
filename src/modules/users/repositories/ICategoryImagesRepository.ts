import CategoryImage from '@modules/users/infra/typeorm/entities/CategoryImage';
import ICreateCategoryImageDTO from '@modules/users/dtos/ICreateCategoryImageDTO';

export default interface ICategoryImagesRepository {
  create(data: ICreateCategoryImageDTO): Promise<CategoryImage>;
  findByCategoryId(category_id: string): Promise<CategoryImage[]>;
  findById(id: string): Promise<CategoryImage | undefined>;
  save(data: CategoryImage): Promise<CategoryImage>;
  delete(data: CategoryImage): Promise<void>;
}
