import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import IContactPageLinksRepository from '../repositories/IContactPageLinksRepository';

@injectable()
class DeleteContactPageLinkService {
  constructor(
    @inject('ContactPageLinksRepository')
    private contactPageLinksRepository: IContactPageLinksRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const link = await this.contactPageLinksRepository.findById(id);

    if (!link) {
      throw new AppError('Contact page link not found!');
    }

    await this.contactPageLinksRepository.delete(id);
  }
}

export default DeleteContactPageLinkService;
