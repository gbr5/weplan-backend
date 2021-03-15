import { injectable, inject } from 'tsyringe';

import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
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
  ) {}

  public async execute({
    id,
    slug,
    name,
    title,
    message,
    isActive,
  }: IRequest): Promise<UserForm> {
    const userForm = await this.userFormsRepository.findById(id);

    if (!userForm) {
      throw new AppError('Contact page not found.');
    }

    if (userForm.slug !== slug) {
      const slugExists = await this.userFormsRepository.findBySlug(slug);

      if (slugExists) {
        throw new AppError('This slug already exists.');
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
