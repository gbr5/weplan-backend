import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class UpdateUserContactPageService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userContactPage = await this.userContactPagesRepository.findById(id);

    if (!userContactPage) {
      throw new AppError('Contact page not found.');
    }

    await this.userContactPagesRepository.delete(id);
  }
}

export default UpdateUserContactPageService;
