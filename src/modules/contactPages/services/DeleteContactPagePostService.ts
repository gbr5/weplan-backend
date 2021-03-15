import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import IContactPagePostsRepository from '../repositories/IContactPagePostsRepository';

@injectable()
class DeleteContactPagePostService {
  constructor(
    @inject('ContactPagePostsRepository')
    private contactPagePostsRepository: IContactPagePostsRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const post = await this.contactPagePostsRepository.findById(id);

    if (!post) {
      throw new AppError('Contact page post not found!');
    }

    await this.contactPagePostsRepository.delete(id);
  }
}

export default DeleteContactPagePostService;
