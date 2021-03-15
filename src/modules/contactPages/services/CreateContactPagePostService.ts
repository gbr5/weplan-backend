import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import IContactPagePostsRepository from '../repositories/IContactPagePostsRepository';
import ICreateContactPagePostDTO from '../dtos/ICreateContactPagePostDTO';
import ContactPagePost from '../infra/typeorm/entities/ContactPagePost';

@injectable()
class CreateContactPagePostService {
  constructor(
    @inject('ContactPagePostsRepository')
    private contactPagePostsRepository: IContactPagePostsRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute({
    contact_page_id,
    image_url,
    destination_url,
  }: ICreateContactPagePostDTO): Promise<ContactPagePost> {
    const userContactPage = await this.userContactPagesRepository.findById(
      contact_page_id,
    );

    if (!userContactPage) {
      throw new AppError('Contact page not found!');
    }

    const contactPagePost = await this.contactPagePostsRepository.create({
      contact_page_id,
      image_url,
      destination_url,
    });

    return contactPagePost;
  }
}

export default CreateContactPagePostService;
