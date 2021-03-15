import { injectable, inject } from 'tsyringe';

import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';

@injectable()
class ShowUserContactPageService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute(slug: string): Promise<UserContactPage | undefined> {
    const userContactPage = await this.userContactPagesRepository.findBySlug(
      slug,
    );

    return userContactPage;
  }
}

export default ShowUserContactPageService;
