import { injectable, inject } from 'tsyringe';

import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute(id: string): Promise<UserForm | undefined> {
    const userForm = await this.userFormsRepository.findById(id);

    if (!userForm) {
      throw new AppError('Form not found!');
    }

    return userForm;
  }
}

export default ShowUserFormService;
