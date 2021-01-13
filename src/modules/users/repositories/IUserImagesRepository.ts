import UserImage from '@modules/users/infra/typeorm/entities/UserImage';
import ICreateUserImageDTO from '../dtos/ICreateUserImageDTO';

export default interface IUserImagesRepository {
  create(data: ICreateUserImageDTO): Promise<UserImage>;
  findByUserId(user_id: string): Promise<UserImage[]>;
  findByUserIdAndImageName(
    user_id: string,
    name: string,
  ): Promise<UserImage | undefined>;
  findById(id: string): Promise<UserImage | undefined>;
  save(data: UserImage): Promise<UserImage>;
  delete(data: UserImage): Promise<void>;
}
