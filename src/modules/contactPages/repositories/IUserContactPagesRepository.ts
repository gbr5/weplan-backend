import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import ICreateUserContactPageDTO from '@modules/contactPages/dtos/ICreateUserContactPageDTO';

export default interface IUserContactPagesRepository {
  create(data: ICreateUserContactPageDTO): Promise<UserContactPage>;
  findById(id: string): Promise<UserContactPage | undefined>;
  findBySlug(slug: string): Promise<UserContactPage | undefined>;
  findByUserId(user_id: string): Promise<UserContactPage[]>;
  save(contactPage: UserContactPage): Promise<UserContactPage>;
  delete(contactPage_id: string): Promise<void>;
}
