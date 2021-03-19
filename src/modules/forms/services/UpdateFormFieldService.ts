import { injectable, inject } from 'tsyringe';

import FormField from '@modules/forms/infra/typeorm/entities/FormField';
import IFormFieldsRepository from '@modules/forms/repositories/IFormFieldsRepository';
import AppError from '@shared/errors/AppError';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

interface IRequest {
  id: string;
  name: string;
  position: number;
  placeholder: string;
  title: string;
  type: string;
  isRequired: boolean;
}

@injectable()
class UpdateFormFieldService {
  constructor(
    @inject('FormFieldsRepository')
    private formFieldsRepository: IFormFieldsRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute({
    id,
    name,
    position,
    placeholder,
    title,
    type,
    isRequired,
  }: IRequest): Promise<FormField> {
    const userForm = await this.formFieldsRepository.findById(id);

    if (!userForm) {
      throw new AppError('Form field not found.');
    }

    const form = await this.userFormsRepository.findById(userForm.form_id);

    if (!form) {
      throw new AppError('Form not found.');
    }

    if (userForm.position !== position) {
      const fieldsToUpdate = form.fields
        .filter(thisField => thisField.position >= position)
        .map(thisField => {
          return {
            ...thisField,
            position: Number(thisField.position) + 1,
          };
        });

      Promise.all([
        fieldsToUpdate.map(thisField => {
          return this.formFieldsRepository.save(thisField);
        }),
      ]);
      userForm.position = position;
    }

    if (userForm.name !== name) {
      const nameExists = await this.formFieldsRepository.findByFormIdAndName({
        name,
        form_id: userForm.id,
      });

      if (nameExists) {
        throw new AppError('This name is already taken.');
      }
      userForm.name = name;
    }

    userForm.placeholder = placeholder;
    userForm.title = title;
    userForm.type = type;
    userForm.isRequired = isRequired;

    const updatedForm = await this.formFieldsRepository.save(userForm);

    return updatedForm;
  }
}

export default UpdateFormFieldService;
