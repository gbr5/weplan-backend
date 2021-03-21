import FormStyles from '@modules/forms/infra/typeorm/entities/FormStyles';
import ICreateFormStylesDTO from '@modules/forms/dtos/ICreateFormStylesDTO';

export default interface IFormStylesRepository {
  create(data: ICreateFormStylesDTO): Promise<FormStyles>;
  findById(id: string): Promise<FormStyles | undefined>;
  findByFormId(form_id: string): Promise<FormStyles | undefined>;
  save(form: FormStyles): Promise<FormStyles>;
  delete(form_id: string): Promise<void>;
}
