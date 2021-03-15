import { injectable, inject } from 'tsyringe';

import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  id: string;
  user_id: string;
  slug: string;
  name: string;
  title: string;
  message: string;
  isActive: boolean;
}

@injectable()
class UpdateUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    user_id,
    slug,
    name,
    title,
    message,
    isActive,
  }: IRequest): Promise<UserForm> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }

    const userForm = await this.userFormsRepository.findById(id);

    if (!userForm) {
      throw new AppError('Contact page not found.');
    }

    if (user_id !== userForm.user_id || user.id !== user_id) {
      throw new AppError('User not found.');
    }

    if (userForm.slug !== slug) {
      const slugExists = await this.userFormsRepository.findByUserIdAndSlug({
        slug,
        user_id,
      });

      if (slugExists) {
        throw new AppError('This slug is already beeing used by another form.');
      }
      userForm.slug = slug;
    }

    userForm.name = name;
    userForm.title = title;
    userForm.message = message;
    userForm.isActive = isActive;

    const form = await this.userFormsRepository.save(userForm);

    return form;
  }
}

export default UpdateUserFormService;
