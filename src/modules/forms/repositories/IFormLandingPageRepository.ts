import FormLandingPage from '@modules/forms/infra/typeorm/entities/FormLandingPage';
import ICreateFormLandingPageDTO from '@modules/forms/dtos/ICreateFormLandingPageDTO';

export default interface IFormLandingPageRepository {
  create(data: ICreateFormLandingPageDTO): Promise<FormLandingPage>;
  findById(id: string): Promise<FormLandingPage | undefined>;
  findByFormId(form_id: string): Promise<FormLandingPage | undefined>;
  save(form: FormLandingPage): Promise<FormLandingPage>;
  delete(form_id: string): Promise<void>;
}
