import { injectable, inject } from 'tsyringe';

import FormField from '@modules/forms/infra/typeorm/entities/FormField';
import IFormFieldsRepository from '@modules/forms/repositories/IFormFieldsRepository';
import AppError from '@shared/errors/AppError';

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
    private userFormsRepository: IFormFieldsRepository,
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
    const userForm = await this.userFormsRepository.findById(id);

    if (!userForm) {
      throw new AppError('Contact page not found.');
    }

    if (userForm.position !== position) {
      const positionExists = await this.userFormsRepository.findByFormIdAndPosition(
        {
          position,
          form_id: userForm.id,
        },
      );

      if (positionExists) {
        throw new AppError('This position is already taken.');
      }
      userForm.position = position;
    }

    if (userForm.name !== name) {
      const nameExists = await this.userFormsRepository.findByFormIdAndName({
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

    const form = await this.userFormsRepository.save(userForm);

    return form;
  }
}

export default UpdateFormFieldService;
