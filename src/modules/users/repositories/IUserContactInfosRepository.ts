import UserContactInfo from '@modules/users/infra/typeorm/entities/UserContactInfo';
import ICreateUserContactInfoDTO from '@modules/users/dtos/ICreateUserContactInfoDTO';

export default interface IUserContactInfoRepository {
  findByUserId(user_id: string): Promise<UserContactInfo[]>;
  findByUserIdAndContactType(
    user_id: string,
    contact_type: string,
  ): Promise<UserContactInfo | undefined>;
  findById(id: string): Promise<UserContactInfo | undefined>;
  create(data: ICreateUserContactInfoDTO): Promise<UserContactInfo>;
  save(userContactInfo: UserContactInfo): Promise<UserContactInfo>;
}
