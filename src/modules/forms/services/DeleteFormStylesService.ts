import { injectable, inject } from 'tsyringe';

import IFormStylesRepository from '@modules/forms/repositories/IFormStylesRepository';
import AppError from '@shared/errors/AppError';
import IUserFormsRepository from '../repositories/IUserFormsRepository';

@injectable()
class DeleteFormStylesService {
  constructor(
    @inject('FormStylesRepository')
    private formStylesRepository: IFormStylesRepository,

    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const formStyles = await this.formStylesRepository.findById(id);

    if (!formStyles) {
      throw new AppError('Form styles not found.');
    }
    await this.formStylesRepository.delete(id);
  }
}

export default DeleteFormStylesService;
