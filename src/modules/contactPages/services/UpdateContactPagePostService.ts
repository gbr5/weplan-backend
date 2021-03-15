import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactPagePostsRepository from '../repositories/IContactPagePostsRepository';
import ContactPagePost from '../infra/typeorm/entities/ContactPagePost';
import IUserContactPagesRepository from '../repositories/IUserContactPagesRepository';

interface IRequest {
  id: string;
  user_id: string;
  image_url: string;
  destination_url: string;
}

@injectable()
class UpdateContactPagePostService {
  constructor(
    @inject('ContactPagePostsRepository')
    private contactPagePostsRepository: IContactPagePostsRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute({
    id,
    user_id,
    image_url,
    destination_url,
  }: IRequest): Promise<ContactPagePost> {
    const post = await this.contactPagePostsRepository.findById(id);

    if (!post) {
      throw new AppError('Contact page post not found!');
    }

    const contactPage = await this.userContactPagesRepository.findById(
      post.contact_page_id,
    );

    if (!contactPage || contactPage.user_id !== user_id) {
      throw new AppError('Contact page not found!');
    }

    post.image_url = image_url;
    post.destination_url = destination_url;

    await this.contactPagePostsRepository.save(post);

    return post;
  }
}

export default UpdateContactPagePostService;
