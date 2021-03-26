import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import ContactPagePost from '@modules/contactPages/infra/typeorm/entities/ContactPagePost';
import IContactPagePostsRepository from '../repositories/IContactPagePostsRepository';

interface IRequest {
  id: string;
  image_url: string;
}
@injectable()
class UpdateContactPageMainImageService {
  constructor(
    @inject('ContactPagePostsRepository')
    private contactPagePostsRepository: IContactPagePostsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, image_url }: IRequest): Promise<ContactPagePost> {
    const post = await this.contactPagePostsRepository.findById(id);

    if (!post) {
      throw new AppError('Only authenticated posts can change image_url.', 401);
    }

    if (post.image_url) {
      await this.storageProvider.deleteFile(post.image_url);
    }

    const fileName = await this.storageProvider.saveFile(image_url);

    post.image_url = fileName;

    await this.contactPagePostsRepository.save(post);

    return post;
  }
}

export default UpdateContactPageMainImageService;
