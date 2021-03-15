import { injectable, inject } from 'tsyringe';

import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class DeleteUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userForm = await this.userFormsRepository.findById(id);

    if (!userForm) {
      throw new AppError('Form not found.');
    }

    if (user_id !== userForm.user_id || user.id !== user_id) {
      throw new AppError('User not found.');
    }

    await this.userFormsRepository.delete(id);
  }
}

export default DeleteUserFormService;
