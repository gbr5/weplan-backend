import UserImageCategory from '@modules/users/infra/typeorm/entities/UserImageCategory';
import ICreateUserImageCategoryDTO from '@modules/users/dtos/ICreateUserImageCategoryDTO';

export default interface IUserImageCategoriesRepository {
  create(data: ICreateUserImageCategoryDTO): Promise<UserImageCategory>;
  findByUserId(user_id: string): Promise<UserImageCategory[]>;
  findByUserIdAndName(
    user_id: string,
    name: string,
  ): Promise<UserImageCategory | undefined>;
  findById(id: string): Promise<UserImageCategory | undefined>;
  save(data: UserImageCategory): Promise<UserImageCategory>;
  delete(data: UserImageCategory): Promise<void>;
}
