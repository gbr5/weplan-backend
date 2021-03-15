import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import ICreateUserFormDTO from '@modules/forms/dtos/ICreateUserFormDTO';
import IFindFormByUserIdAndSlugDTO from '../dtos/IFindFormByUserIdAndSlugDTO';

export default interface IUserFormsRepository {
  create(data: ICreateUserFormDTO): Promise<UserForm>;
  findById(id: string): Promise<UserForm | undefined>;
  findByUserIdAndSlug({
    slug,
    user_id,
  }: IFindFormByUserIdAndSlugDTO): Promise<UserForm | undefined>;
  findByUserId(user_id: string): Promise<UserForm[]>;
  save(form: UserForm): Promise<UserForm>;
  delete(form_id: string): Promise<void>;
}
