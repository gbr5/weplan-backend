import { injectable, inject } from 'tsyringe';

import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserFormDTO from '../dtos/ICreateUserFormDTO';

@injectable()
class CreateUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    slug,
    user_id,
    name,
    title,
    message,
    isActive,
  }: ICreateUserFormDTO): Promise<UserForm> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userForm = await this.userFormsRepository.findByUserIdAndSlug({
      slug,
      user_id,
    });

    if (userForm) {
      throw new AppError(
        'A page with the same slug already exists. Try another one!',
      );
    }

    const form = await this.userFormsRepository.create({
      user_id,
      slug,
      name,
      title,
      message,
      isActive,
    });

    return form;
  }
}

export default CreateUserFormService;
