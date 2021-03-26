import { injectable, inject } from 'tsyringe';

import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';

@injectable()
class ShowUserExternalContactPageService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute(id: string): Promise<UserContactPage | undefined> {
    const userContactPage = await this.userContactPagesRepository.findById(id);

    return userContactPage;
  }
}

export default ShowUserExternalContactPageService;
