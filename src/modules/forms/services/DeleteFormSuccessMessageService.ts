import { injectable, inject } from 'tsyringe';

import IFormSuccessMessageRepository from '@modules/forms/repositories/IFormSuccessMessageRepository';
import AppError from '@shared/errors/AppError';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

@injectable()
class DeleteFormSuccessMessageService {
  constructor(
    @inject('FormSuccessMessageRepository')
    private formSuccessMessageRepository: IFormSuccessMessageRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const formSuccessMessage = await this.formSuccessMessageRepository.findById(
      id,
    );

    if (!formSuccessMessage) {
      throw new AppError('Contact page not found.');
    }
    await this.formSuccessMessageRepository.delete(id);
  }
}

export default DeleteFormSuccessMessageService;
