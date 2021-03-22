import { injectable, inject } from 'tsyringe';

import IFormLandingPageRepository from '@modules/forms/repositories/IFormLandingPageRepository';
import AppError from '@shared/errors/AppError';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

@injectable()
class DeleteFormLandingPageService {
  constructor(
    @inject('FormLandingPageRepository')
    private formLandingPageRepository: IFormLandingPageRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const formLandingPage = await this.formLandingPageRepository.findById(id);

    if (!formLandingPage) {
      throw new AppError('Form styles not found.');
    }
    await this.formLandingPageRepository.delete(id);
  }
}

export default DeleteFormLandingPageService;
