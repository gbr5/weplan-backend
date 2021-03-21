import FormSuccessMessage from '@modules/forms/infra/typeorm/entities/FormSuccessMessage';
import ICreateFormSuccessMessageDTO from '@modules/forms/dtos/ICreateFormSuccessMessageDTO';

export default interface IFormSuccessMessageRepository {
  create(data: ICreateFormSuccessMessageDTO): Promise<FormSuccessMessage>;
  findById(id: string): Promise<FormSuccessMessage | undefined>;
  findByFormId(form_id: string): Promise<FormSuccessMessage | undefined>;
  save(form: FormSuccessMessage): Promise<FormSuccessMessage>;
  delete(form_id: string): Promise<void>;
}
