import { injectable, inject } from 'tsyringe';

import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IFindContactPageByUserNameAndSlugDTO from '../dtos/IFindContactPageByUserNameAndSlugDTO';

@injectable()
class ShowUserContactPageService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    slug,
    name,
  }: IFindContactPageByUserNameAndSlugDTO): Promise<
    UserContactPage | undefined
  > {
    const user = await this.usersRepository.findByTrimmedName(name);

    if (!user) {
      throw new AppError('User not found!');
    }

    const userContactPage = await this.userContactPagesRepository.findByUserIdAndSlug(
      {
        slug,
        user_id: user.id,
      },
    );

    return userContactPage;
  }
}

export default ShowUserContactPageService;
