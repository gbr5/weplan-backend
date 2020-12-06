import UserFileCategory from '@modules/users/infra/typeorm/entities/UserFileCategory';
import ICreateUserFileCategoryDTO from '@modules/users/dtos/ICreateUserFileCategoryDTO';

export default interface IUserFileCategoriesRepository {
  create(data: ICreateUserFileCategoryDTO): Promise<UserFileCategory>;
  findByUserId(user_id: string): Promise<UserFileCategory[]>;
  findByUserIdAndName(
    user_id: string,
    name: string,
  ): Promise<UserFileCategory | undefined>;
  findById(id: string): Promise<UserFileCategory | undefined>;
  save(data: UserFileCategory): Promise<UserFileCategory>;
  delete(data: UserFileCategory): Promise<void>;
}
