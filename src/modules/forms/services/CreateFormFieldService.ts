import { injectable, inject } from 'tsyringe';

import FormField from '@modules/forms/infra/typeorm/entities/FormField';
import IFormFieldsRepository from '@modules/forms/repositories/IFormFieldsRepository';
import AppError from '@shared/errors/AppError';
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
    position,
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

    const formField = await this.formFieldsRepository.findByFormIdAndPosition({
      form_id,
      position,
    });

    if (formField) {
      throw new AppError(
        'A field with the same position already exists. Try another one!',
      );
    }

    const nameExists = await this.formFieldsRepository.findByFormIdAndName({
      form_id,
      name,
    });

    if (nameExists) {
      throw new AppError(
        'A field with the same name already exists. Try another one!',
      );
    }

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
