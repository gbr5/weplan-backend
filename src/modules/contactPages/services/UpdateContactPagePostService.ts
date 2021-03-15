import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactPagePostsRepository from '../repositories/IContactPagePostsRepository';
import ContactPagePost from '../infra/typeorm/entities/ContactPagePost';

interface IRequest {
  id: string;
  image_url: string;
  destination_url: string;
}

@injectable()
class UpdateContactPagePostService {
  constructor(
    @inject('ContactPagePostsRepository')
    private contactPagePostsRepository: IContactPagePostsRepository,
  ) {}

  public async execute({
    id,
    image_url,
    destination_url,
  }: IRequest): Promise<ContactPagePost> {
    const link = await this.contactPagePostsRepository.findById(id);

    if (!link) {
      throw new AppError('Contact page link not found!');
    }

    link.image_url = image_url;
    link.destination_url = destination_url;

    await this.contactPagePostsRepository.save(link);

    return link;
  }
}

export default UpdateContactPagePostService;
