import { injectable, inject } from 'tsyringe';

import FormSuccessMessage from '@modules/forms/infra/typeorm/entities/FormSuccessMessage';
import IFormSuccessMessageRepository from '@modules/forms/repositories/IFormSuccessMessageRepository';
import AppError from '@shared/errors/AppError';
import ICreateFormSuccessMessageDTO from '../dtos/ICreateFormSuccessMessageDTO';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

@injectable()
class CreateFormSuccessMessageService {
  constructor(
    @inject('FormSuccessMessageRepository')
    private formSuccessMessageRepository: IFormSuccessMessageRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute({
    form_id,
    title,
    message,
  }: ICreateFormSuccessMessageDTO): Promise<FormSuccessMessage> {
    const form = await this.userFormsRepository.findById(form_id);

    if (!form) {
      throw new AppError('Form not found.');
    }

    if (form.successMessage) {
      throw new AppError('This form already have a success message.');
    }

    const newSuccessMessage = await this.formSuccessMessageRepository.create({
      form_id,
      title,
      message,
    });

    return newSuccessMessage;
  }
}

export default CreateFormSuccessMessageService;
