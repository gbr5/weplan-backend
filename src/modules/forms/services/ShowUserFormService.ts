import { injectable, inject } from 'tsyringe';

import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';

@injectable()
class ShowUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,
  ) {}

  public async execute(slug: string): Promise<UserForm | undefined> {
    const userForm = await this.userFormsRepository.findBySlug(slug);

    return userForm;
  }
}

export default ShowUserFormService;
