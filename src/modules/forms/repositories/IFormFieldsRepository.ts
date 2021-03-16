import FormField from '@modules/forms/infra/typeorm/entities/FormField';
import ICreateFormFieldDTO from '@modules/forms/dtos/ICreateFormFieldDTO';
import IFindByFormIdAndPositionDTO from '../dtos/IFindByFormIdAndPositionDTO';
import IFindByFormIdAndNameDTO from '../dtos/IFindByFormIdAndNameDTO';

export default interface IFormFieldsRepository {
  create(data: ICreateFormFieldDTO): Promise<FormField>;
  findById(id: string): Promise<FormField | undefined>;
  findByFormIdAndPosition({
    position,
    form_id,
  }: IFindByFormIdAndPositionDTO): Promise<FormField | undefined>;
  findByFormIdAndName({
    name,
    form_id,
  }: IFindByFormIdAndNameDTO): Promise<FormField | undefined>;
  findByFormId(form_id: string): Promise<FormField[]>;
  save(form: FormField): Promise<FormField>;
  delete(form_id: string): Promise<void>;
}
