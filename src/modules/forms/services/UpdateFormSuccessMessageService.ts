import { injectable, inject } from 'tsyringe';

import FormSuccessMessage from '@modules/forms/infra/typeorm/entities/FormSuccessMessage';
import IFormSuccessMessageRepository from '@modules/forms/repositories/IFormSuccessMessageRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  message: string;
  title: string;
}

@injectable()
class UpdateFormSuccessMessageService {
  constructor(
    @inject('FormSuccessMessageRepository')
    private formSuccessMessageRepository: IFormSuccessMessageRepository,
  ) {}

  public async execute({
    id,
    message,
    title,
  }: IRequest): Promise<FormSuccessMessage> {
    const fomrSuccessMessage = await this.formSuccessMessageRepository.findById(
      id,
    );

    if (!fomrSuccessMessage) {
      throw new AppError('Form field not found.');
    }

    fomrSuccessMessage.message = message;
    fomrSuccessMessage.title = title;

    const updatedForm = await this.formSuccessMessageRepository.save(
      fomrSuccessMessage,
    );

    return updatedForm;
  }
}

export default UpdateFormSuccessMessageService;
