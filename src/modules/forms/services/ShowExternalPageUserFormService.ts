import { injectable, inject } from 'tsyringe';

import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import AppError from '@shared/errors/AppError';

@injectable()
class ShowExternalPageUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<UserForm | undefined> {
    const userForm = await this.userFormsRepository.findById(id);

    return userForm;
  }
}

export default ShowExternalPageUserFormService;
