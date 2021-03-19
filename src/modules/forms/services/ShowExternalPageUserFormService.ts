import { injectable, inject } from 'tsyringe';

import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowExternalPageUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    slug: string,
    name: string,
  ): Promise<UserForm | undefined> {
    const user = await this.usersRepository.findByTrimmedName(name);

    if (!user) {
      throw new AppError('User not found!');
    }

    const userForm = await this.userFormsRepository.findByUserIdAndSlug({
      slug,
      user_id: user.id,
    });

    return userForm;
  }
}

export default ShowExternalPageUserFormService;
