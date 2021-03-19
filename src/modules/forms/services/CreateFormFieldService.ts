import { injectable, inject } from 'tsyringe';

import FormField from '@modules/forms/infra/typeorm/entities/FormField';
import IFormFieldsRepository from '@modules/forms/repositories/IFormFieldsRepository';
import AppError from '@shared/errors/AppError';
import { sortFormFields } from '@config/sortFormFields';
import ICreateFormFieldDTO from '../dtos/ICreateFormFieldDTO';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

@injectable()
class CreateFormFieldService {
  constructor(
    @inject('FormFieldsRepository')
    private formFieldsRepository: IFormFieldsRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute({
    form_id,
    placeholder,
    name,
    title,
    type,
    isRequired,
  }: ICreateFormFieldDTO): Promise<FormField> {
    const form = await this.userFormsRepository.findById(form_id);

    if (!form) {
      throw new AppError('Form not found.');
    }
    const sortedFields = sortFormFields(form.fields).reverse();
    const position =
      sortedFields && sortedFields.length > 0
        ? Number(sortedFields[0].position) + 1
        : 1;
    console.log(sortedFields);
    const nameExists = await this.formFieldsRepository.findByFormIdAndName({
      form_id,
      name,
    });

    if (nameExists) {
      throw new AppError(
        'A field with the same name already exists for this form. Try another one!',
      );
    }
    console.log('estou aqui');

    const newField = await this.formFieldsRepository.create({
      form_id,
      position,
      placeholder,
      name,
      title,
      type,
      isRequired,
    });

    return newField;
  }
}

export default CreateFormFieldService;
