import { injectable, inject } from 'tsyringe';

import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class UpdateUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userForm = await this.userFormsRepository.findById(id);

    if (!userForm) {
      throw new AppError('Contact page not found.');
    }

    await this.userFormsRepository.delete(id);
  }
}

export default UpdateUserFormService;
