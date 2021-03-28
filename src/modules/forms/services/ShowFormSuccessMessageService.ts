import { injectable, inject } from 'tsyringe';

import FormSuccessMessage from '@modules/forms/infra/typeorm/entities/FormSuccessMessage';
import AppError from '@shared/errors/AppError';
import IFormSuccessMessageRepository from '../repositories/IFormSuccessMessageRepository';

@injectable()
class ShowFormServiceSuccessMessage {
  constructor(
    @inject('FormSuccessMessageRepository')
    private formSuccessMessageRepository: IFormSuccessMessageRepository,
  ) {}

  public async execute(id: string): Promise<FormSuccessMessage | undefined> {
    const formSuccessMessage = await this.formSuccessMessageRepository.findById(
      id,
    );

    if (!formSuccessMessage) {
      throw new AppError('Form not found!');
    }

    return formSuccessMessage;
  }
}

export default ShowFormServiceSuccessMessage;
