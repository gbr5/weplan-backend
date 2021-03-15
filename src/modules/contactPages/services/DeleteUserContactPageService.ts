import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class UpdateUserContactPageService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }

    const userContactPage = await this.userContactPagesRepository.findById(id);

    if (!userContactPage) {
      throw new AppError('Contact page not found.');
    }

    if (user_id !== userContactPage.user_id || user.id !== user_id) {
      throw new AppError('User not found.');
    }

    await this.userContactPagesRepository.delete(id);
  }
}

export default UpdateUserContactPageService;
