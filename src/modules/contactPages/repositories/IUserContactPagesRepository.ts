import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import ICreateUserContactPageDTO from '@modules/contactPages/dtos/ICreateUserContactPageDTO';
import IFindContactPageByUserIdAndSlugDTO from '@modules/contactPages/dtos/IFindContactPageByUserIdAndSlugDTO';
import IFindContactPageByUserNameAndSlugDTO from '../dtos/IFindContactPageByUserNameAndSlugDTO';

export default interface IUserContactPagesRepository {
  create(data: ICreateUserContactPageDTO): Promise<UserContactPage>;
  findById(id: string): Promise<UserContactPage | undefined>;
  findByUserIdAndSlug({
    slug,
    user_id,
  }: IFindContactPageByUserIdAndSlugDTO): Promise<UserContactPage | undefined>;
  findByUserNameAndSlug({
    slug,
    name,
  }: IFindContactPageByUserNameAndSlugDTO): Promise<
    UserContactPage | undefined
  >;
  findByUserId(user_id: string): Promise<UserContactPage[]>;
  save(contactPage: UserContactPage): Promise<UserContactPage>;
  delete(id: string): Promise<void>;
}
