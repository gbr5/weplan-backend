import { injectable, inject } from 'tsyringe';

import FormStyles from '@modules/forms/infra/typeorm/entities/FormStyles';
import IFormStylesRepository from '@modules/forms/repositories/IFormStylesRepository';
import AppError from '@shared/errors/AppError';
import ICreateFormStylesDTO from '../dtos/ICreateFormStylesDTO';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

@injectable()
class CreateFormStylesService {
  constructor(
    @inject('FormStylesRepository')
    private formStylesRepository: IFormStylesRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute({
    form_id,
    background_color,
    button_color,
    button_text_color,
    text_color,
  }: ICreateFormStylesDTO): Promise<FormStyles> {
    const form = await this.userFormsRepository.findById(form_id);

    if (!form) {
      throw new AppError('Form not found.');
    }

    if (form.styles) {
      throw new AppError('This form already have a styles info.');
    }

    const newStyles = await this.formStylesRepository.create({
      form_id,
      background_color,
      button_color,
      button_text_color,
      text_color,
    });

    return newStyles;
  }
}

export default CreateFormStylesService;
